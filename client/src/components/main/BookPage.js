import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../../axiosWithAuth';
import { Button, Image, Item, Card, Icon, ItemDescription } from 'semantic-ui-react';
import styled from 'styled-components';

import Review from './Review';

const Wrap = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: left;

`;
const ReviewWrap = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: left;
`;
const ReviewHeader = styled.div`
display: flex;
justify-content: space-between;
`;
const CustomButton = styled.button`
  width: 220px;
  height: '30px'
  margin: '10px'
  color: 'white'
`
function BookPage({ history, match }) {
  const id = match.params.id;
  console.log("at BookPage");

  const [displayBook, setDisplayBook] = useState(null);

  useEffect(() => {
    console.log('INSIDE BOOKPAGE')
    axiosWithAuth()
    .get(`https://bookr-bw.herokuapp.com/api/books/${id}`)
    .then(response => {
      console.log(response.data);
      setDisplayBook(response.data)
      

    })
    .catch(error => { 
      console.error('Server Error', error);
    });
  
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
        <Item.Image size='small' src={displayBook.url} 
                     style={{width: '200px'}}/>
      </Item>
      <Item.Content style={{display: 'flex', flexDirection: 'column', justifyItems: 'left', padding: '40px', width: '500px'}}>
        <Button style={{alignSelf: 'flex-end', width: '100px'}}floated='right'>Purchase</Button>
        <Item.Header><h2>{displayBook.title}</h2></Item.Header>
        <Item.Description><strong>{displayBook.author}</strong></Item.Description>
        <Item.Header>{displayBook.publisher} {displayBook.published}</Item.Header>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Card.Content extra>
            <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' />
          </Card.Content>
          <p style={{padding: '10px'}}> {displayBook.reviews ? displayBook.reviews.length : 0} Reviews</p>
        </div>
        
          {/* <Item.Header>Published: </Item.Header> */}
          {/* <Item.Description>ISBN: {displayBook.isbn}</Item.Description> */}
          <Item.Description><strong>Description:</strong></Item.Description>
          <p>{displayBook.description}</p>
          <button style={{width: '220px', height: '30px', margin: '10px', background: '#0D5813', color: 'white', border: 'none', borderRadius: '20px'}}>Add To My Books</button>
          <Link to={`/${id}/addreview`}><button onClick={handleClick} style={{width: '220px', height: '30px', margin: '10px', background: '#BF9018', color: 'white', border: 'none', borderRadius: '20px'}}>Add A Review</button></Link>
      </Item.Content>
    </Wrap>
    <div>
      <ReviewHeader>
        <h2 style={{margin: '10px', color: '#BF9018', fontSize: '3.6rem'}}>User Reviews</h2>
      </ReviewHeader>
      <ReviewWrap>
        {displayBook.reviews ? displayBook.reviews.map((item, index) => {
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