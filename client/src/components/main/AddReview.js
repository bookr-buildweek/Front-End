import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Image, Item, Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import Review from './Review';

const Wrap = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: left;

`

function AddReview({ history, match }) {
  const [review, setReview] = useState({name: '', review: ''});
  const id = match.params.id;

  const [displayBook, setDisplayBook] = useState(null);

  useEffect(() => {
    axios
    .get('https://www.googleapis.com/books/v1/volumes?q=quilting')
    .then(response => {

      response.data.items.forEach(item => {
        if (item.id === id) {
          setDisplayBook(item);
        }
      })

    })
    .catch(error => { 
      console.error('Server Error', error);
    });
  
  }, [id])

  function handleClick() {
    history.push(`/${id}`);
  }

  function handleChange() {

  }

  function handleSubmit() {

  }

  if (displayBook) {
    return (
      <div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <Button onClick={handleClick} style={{alignSelf: 'flex-start', width: '400px'}}floated='right'>Back to Book Page</Button>
      <Wrap>
        <Item style={{padding: '40px'}}>
          <Item.Image size='small' src={displayBook.volumeInfo.imageLinks.thumbnail} 
                      style={{width: '200px'}}/>
        </Item>
        <Item.Content style={{display: 'flex', flexDirection: 'column', justifyItems: 'left', padding: '40px', width: '500px'}}>
          <Button style={{alignSelf: 'flex-end', width: '100px'}}floated='right'>Purchase</Button>
          <Item.Header><h1>{displayBook.volumeInfo.title}</h1></Item.Header>
          <Item.Description>by <strong>{displayBook.volumeInfo.authors}</strong></Item.Description>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Card.Content extra>
              <Icon name='star outline' />
              <Icon name='star outline' />
              <Icon name='star outline' />
              <Icon name='star outline' />
              <Icon name='star outline' />
            </Card.Content>
            <p style={{padding: '10px'}}> {displayBook.volumeInfo.reviews ? displayBook.volumeInfo.reviews.length : 0} Reviews</p>
          </div>
          <Item.Header>Publisher: {displayBook.volumeInfo.publisher}</Item.Header>
            <Item.Header>Published: {displayBook.volumeInfo.publishedDate}</Item.Header>
            <Item.Description>ISBN: {displayBook.volumeInfo.industryIdentifiers[0].identifier}</Item.Description>
            <Item.Description><strong>Description:</strong></Item.Description>
            <p>{displayBook.volumeInfo.description}</p>
        </Item.Content>
      </Wrap>
      </div>
          <form id="form" onSubmit={handleSubmit} style={{width: '500px', margin: '0 auto', marginTop: '40px'}}>
          <fieldset>
            <legend>Add a Review</legend>
            <div >
              <label>
                Name
                <div>
                  <input
                    type="text"
                    name="name"
                    value={review.name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label>Review</label>
              <input style={{width: '300px', height: '100px'}}
                type="review"
                name="review"
                value={review.review}
                aria-describedby="emailHelp"
                // placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <button type="submit">
              Save Review
            </button>
          </fieldset>
        </form>
        </div>
    )
  } else {
    return (
      <p>Loading</p>
    )
  }
}

export default AddReview;