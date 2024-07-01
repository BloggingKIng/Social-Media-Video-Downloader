import {Nav, Container} from 'react-bootstrap';
import React, {useState} from 'react';
import TwitterDownloader from './TwitterDownloader';
import FacebookVideoDownloader from './FacebookVideoDownloader';
import YoutubeVideoDownloader from './YoutubeVideoDownloader';
import RedditVideoDownloader from './RedditVideoDownloader';
import './main.css';
export default function Main (){
    const [activeKey, setActiveKey] = useState('twitter');
    const [twitterData, setTwitterData] = useState({link:'', videoLink: '', loading: false});
    const [facebookData, setFacebookData] = useState({link:'', videoLink: '', loading: false});
    const [youtubeData, setYoutubeData] = useState({link:'', videoLink: '', loading: false});
    const [redditData, setRedditData] = useState({link:'', videoLink: '', loading: false});

    const handleSetActiveKey = (key) => {
        console.log(key);
        setActiveKey(key);
    }
    return(
    <Container>
        <Container className='nav-container m-5'>
            <Nav variant='pills' defaultActiveKey={'twitter'} fill={true} justify={true} onSelect={handleSetActiveKey}>
                <Nav.Item>
                    <Nav.Link eventKey={'twitter'}  onClick={(e)=>e.preventDefault()} active={activeKey === 'twitter'}>Twitter Video Downloader</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={'facebook'} onClick={(e)=>e.preventDefault()}  active={activeKey === 'facebook'}>Facebook Video Downloader</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={'youtube'}  onClick={(e)=>e.preventDefault()} active={activeKey === 'youtube'}>Youtube Video Downloader</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={'reddit'}  onClick={(e)=>e.preventDefault()} active={activeKey === 'reddit'}>Reddit Video Downloader</Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
        <Container>
            {
                activeKey==="twitter"? <TwitterDownloader data={twitterData} setData={setTwitterData}/> : 
                activeKey==="facebook"? <FacebookVideoDownloader data={facebookData} setData={setFacebookData} /> : 
                activeKey==="youtube"? <YoutubeVideoDownloader data={youtubeData} setData={setYoutubeData}/> : 
                activeKey==="reddit"? <RedditVideoDownloader data={redditData} setData={setRedditData}/> :
                null
            }
        </Container>
    </Container>
    )
}