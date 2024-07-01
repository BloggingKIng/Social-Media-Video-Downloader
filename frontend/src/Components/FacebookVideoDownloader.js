import { Container, Form,  Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import {toast, ToastContainer}  from 'react-toastify';
export default function FacebookVideoDownloader(props) {
    const {link, loading, videoLink} = props.data;
    const  setData = (data) => props.setData(data);

    const handleDownload = async() => {
        console.log(link);
        setData({link: "", loading: true, videoLink: ""});
        await axios.post('http://127.0.0.1:8000/api/download/facebook-video/', {url: link})
        .then((res) => {
            console.log(res.data);
            toast.success('Video downloaded successfully!')
            setData({link: link, loading: false, videoLink: res.data.video.video});
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, while downloading video! Please try again later!")
            setData({link: link, loading: false, videoLink: ""});
        })
    }

    return (
        <Container>
            <ToastContainer />
            <h2 className="m-5 text-center">Facebook Video Downloader</h2>
            <Container style={{display:'flex', justifyContent:'center'}}> 
                {!loading && <Form style={{width:'100%', display:'flex',justifyContent:'center'}}>
                    <Form.Group className="" controlId="link" style={{width:'50%'}}>
                        <Form.Control type="text" placeholder="Enter the link of the facebook video" value={link} onChange={(e) => setData({...props.data, link: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" style={{height:'fit-content'}} onClick={handleDownload}>
                            Download Video
                        </Button>
                    </Form.Group>
                </Form>}
                {
                    loading && <Spinner animation="border" />
                }
            </Container>
            {
                videoLink !== "" && 
                <Container className="mt-5 mb-5">
                    <h2 className="text-center mb-3">Downloaded Video</h2>
                    <p className="text-center text-muted">Click the 3 dots (⫶) at the bottom right of the video to download</p>
                    <Container style={{display:'flex', justifyContent:'center'}}>
                        <video width="60%" height="60%" controls style={{maxWidth:'600px', maxHeight:'400px'}}>
                            <source src={"http://127.0.0.1:8000" +videoLink} type="video/mp4" />
                        </video>
                    </Container>
                </Container>
            }
        </Container>
    )

}


