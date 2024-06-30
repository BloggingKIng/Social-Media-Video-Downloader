import { Container, Form,  Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import {toast, ToastContainer}  from 'react-toastify';
export default function TwitterDownloader() {
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [videoLink, setVideoLink] = useState("");

    const handleDownload = async() => {
        console.log(link);
        setLoading(true);
        setVideoLink("");
        await axios.post('http://127.0.0.1:8000/api/download/twitter-video/', {url: link})
        .then((res) => {
            console.log(res.data);
            toast.success('Video downloaded successfully!')
            setVideoLink(res.data.video.video);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error, while downloading video! Please try again later!")
            setLoading(false);
        })
    }

    return (
        <Container>
            <ToastContainer />
            <h2 className="m-5 text-center">Twitter Video Downloader</h2>
            <Container style={{display:'flex', justifyContent:'center'}}> 
                {!loading && <Form style={{width:'100%', display:'flex',justifyContent:'center'}}>
                    <Form.Group className="" controlId="link" style={{width:'50%'}}>
                        <Form.Control type="text" placeholder="Enter the link of the tweet" value={link} onChange={(e) => setLink(e.target.value)} />
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
                <Container className="mt-5">
                    <h2 className="text-center">Downloaded Video</h2>
                    <Container style={{display:'flex', justifyContent:'center'}}>
                        <video width="500" height="260" controls>
                            <source src={"http://127.0.0.1:8000" +videoLink} type="video/mp4" />
                        </video>
                    </Container>
                </Container>
            }
        </Container>
    )

}


