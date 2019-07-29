import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Image, Item, Card, Icon, ItemDescription } from 'semantic-ui-react';
import styled from 'styled-components';

import Review from './Review';

const Wrap = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: left;

`
const ReviewWrap = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: left;
`
const ReviewHeader = styled.div`
display: flex;
justify-content: space-between;

`

function BookPage({ history, match, tempItem }) {
  const id = match.params.id;

  const [displayBook, setDisplayBook] = useState(null);

  useEffect(() => {
    if (id === '0') {
      setDisplayBook(tempItem)
    } else {
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
  }
  }, [id])

  function handleClick() {
    history.push('/')
  }

  if (displayBook) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <Button onClick={handleClick} style={{alignSelf: 'flex-start', width: '400px'}}floated='right'>Back to Search Results</Button>
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
    <div style={{border: '1px solid darkblue'}}>
      <ReviewHeader>
        <h2 style={{margin: '10px'}}>Reviews</h2>
        <div>
          <button style={{width: '120px', height: '30px', margin: '10px'}}>Save Book</button>
          <Link to={`/${id}/addreview`}><button onClick={handleClick} style={{width: '120px', height: '30px', margin: '10px'}}>Add Review</button></Link>
        </div>
      </ReviewHeader>
      <ReviewWrap>
        {displayBook.volumeInfo.reviews ? displayBook.volumeInfo.reviews.map((item, index) => {
          return <Review key={index} review={item}/>
        }) : null} 
      </ReviewWrap>
    </div>
    </div>
  )
} else {
  return (
    <p>Loading</p>
  )
}
}
export default BookPage;