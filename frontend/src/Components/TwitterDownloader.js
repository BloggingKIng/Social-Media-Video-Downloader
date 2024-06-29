import { Container, Form,  Button } from "react-bootstrap";
import { useState } from "react";
export default function TwitterDownloader() {
    const [link, setLink] = useState("");
    return (
        <Container>
            <h2 className="m-5 text-center">Twitter Video Downloader</h2>
            <Container style={{display:'flex', justifyContent:'center'}}> 
                <Form style={{width:'100%', display:'flex',justifyContent:'center'}}>
                    <Form.Group className="" controlId="link" style={{width:'50%'}}>
                        <Form.Control type="text" placeholder="Enter the link of the tweet" value={link} onChange={(e) => setLink(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" style={{height:'fit-content'}}>
                            Download Video
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </Container>
    )

}


