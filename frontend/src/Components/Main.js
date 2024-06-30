import {Nav, Container} from 'react-bootstrap';
import React, {useState} from 'react';
import TwitterDownloader from "./TwitterDownloader";
import FacebookVideoDownloader from "./FacebookVideoDownloader";
export default function Main (){
    const [activeKey, setActiveKey] = useState('twitter');
    const handleSetActiveKey = (key) => {
        console.log(key);
        setActiveKey(key);
    }
    return(
    <Container>
        <Container className='nav-container m-5'>
            <Nav variant='pills' defaultActiveKey={'twitter'} fill={true} justify={true} onSelect={handleSetActiveKey}>
                <Nav.Item>
                    <Nav.Link eventKey={'twitter'} active={activeKey === 'twitter'}>Twitter Video Downloader</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={'facebook'} active={activeKey === 'facebook'}>Facebook Video Downloader</Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
        <Container>
            {
                activeKey==="twitter"? <TwitterDownloader /> : 
                activeKey==="facebook"? <FacebookVideoDownloader /> : null
            }
        </Container>
    </Container>
    )
}