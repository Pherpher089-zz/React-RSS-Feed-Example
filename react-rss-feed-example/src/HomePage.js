import React, {useState, useEffect} from 'react';
import './HomePage.css';
import { observer } from 'mobx-react';
import Card from 'react-bootstrap/Card';
import {Formik} from 'fromik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import {Redirect} from 'react-router-dom';
const querystring = require('querystring');

// yup is used to validate data to make sure that it is correct. One of the best
// use cases is for form data validation
const schema = yup.object({
    name: yup.string().required("URL is required"),
    url: yup
        .string()
        .required("URL is required")
        .matches(
            /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
            "Invalid URL"
        ),
});

function HomePage({ feedstore }) {
    const [initialized, setInitialized ] = useState(false);
    const [redirectToFeed, setRedirectToFeed] = useState(false);

    const handleSubmit = async evt =>{
        const isValid = await schema.validate(evt);
        if(!isValid) {
            return;
        }
        feedstore.feeds.push(ent);
        feedstore.setFeeds(feedstore.feeds);
        localStorage.setItem("feeds", JASON.stringify(feedstore.feeds));
    }

    const setSelectedFeed = url => {
        feedstore.setSelectedFeed(url);
        setRedirectToFeed(true);
    };

    useEffect(()=>{
        if(!initialized) {
            let rssFeeds = [];
            try{
                rssFeeds = JSON.parse(localStorage.getItem("feeds"));
                if(Array.isArray(rssFeeds)) {
                    feedstore.setFeeds(rssFeeds)
                }
            } catch (ex) {
                setInitialized(true);
            }
        }
    })

    if(redirectToFeed) {
        return (
            <Redirect to={`/feed?${querystring.encode({url:feedstore.feed})}`} />
        )
    }

    return (
        <div className='home-page'>
            <h1 className='center'>RSS Feeds</h1>
            <Formik validationSchema={schema} onSubmit={handleSubmit}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isInvalid,
                    errors
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlID="Name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={values.name || " "}
                                    onChange={handleChange}
                                    isInvalid={touched.name && errors.name}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type='submit'>Add</Button>
                    </Form>
                )}
            </Formik>
            <br />
            {feedstore.map((f, i) => {
                return(
                    <Card key={i}>
                        <Card.Title className="card-title">{f.name}</Card.Title>
                        <Card.Body>
                            <p>{f.url}</p>
                            <Button
                                variant="primary"
                                onClick={setSelectedFeed.bind(this,f.url)}>Open</Button>{" "}
                                <Button variant="primary" onClick={deleteFeed.bind(this, i)}>Delete</Button>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
        );
    }
    export default observer(HomePage);

