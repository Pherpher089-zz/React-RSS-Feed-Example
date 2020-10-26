import React, {useState, useEffect } from 'react';
import './FeedPage.css';
import {observer} from 'mobx-react';
import WithRouter from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { getFeedList } from '/requests';
const querystring = require("querystring");

function FeedPage({feedStore, location}) {
    const [initialized, setInitialized] = useState(false);
    const [url, setUrl] = useState('');
    const [listing, setListing] = useState([]);
    const [data, setData] = useState({});

    const getListing = async url =>{
        try{
            const responce = await getFeedListing(url)
            setListing(response.data.items);
            setData(response.data.feed);
        } catch(ex) {
            console.log(ex);
        }
    };

    const openLink = url => {
        window.location.href = url;
    };

    useEffect(() => {
        if(!initialized) {
            const url = querystring.decode(location.search)["?url"] //TODO -Not sure what ["?url"] means. Could be object key.
            setUrl(url);
            setListing(url);
            setInitialized(true);
        }
    });

    return(
        <div className="feed-page">
            <h1 className='center title'>
                <img src={data.img}/> {data.title}
                {listings.map((l, i) => {
                    return(
                        <Card key={i} >
                            <Card.Title className="card-title">{l.title}</Card.Title>
                            <Card.Body>
                                <p>{l.description}</p>
                                <p>{l.content}</p>
                                <Button variant="primary" onClick={openLink.bind(this,l.link)}>Open</Button>{" "} {/*Need to research what the bind method does. Will most def come up in an interview*/}
                            </Card.Body>
                        </Card>
                    )
                })}
            </h1>
        </div>
    )
}

//TODO - Research what with router actually does
export default WithRouter(observer(FeedPage))