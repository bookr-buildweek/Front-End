import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../../axiosWithAuth';
import { Button, Item, Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import Review from './Review';
import Form from './Form';

import ThreeStar from '../../assets/3_stars.png';
import OneStar from '../../assets/1_star.png';
import TwoStar from '../../assets/2_stars.png';
import FourStar from '../../assets/4_stars.png';
import FiveStar from '../../assets/5_stars.png';

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

function BookPage({ history, match }) {
  let arr = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar];
  var stars = arr[Math.floor(Math.random()*arr.length)];
  const id = match.params.id;
  console.log("at BookPage");

  const [displayBook, setDisplayBook] = useState(null);

  useEffect(() => {
    console.log('INSIDE BOOKPAGE')
    axiosWithAuth()
    .get(`https://bookr-bw.herokuapp.com/api/books/${id}`)
    .then(response => {
      setDisplayBook(response.data)
    })
    .catch(error => { 
      console.error('Server Error', error);
    });
  
  }, [id])

  function handleClick() {
    history.go(-1);
  }

  function handleAddReview() {
    history.push(`/${id}/addreview`);
  }

  if (displayBook) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', }}>
    <Button onClick={handleClick} style={{alignSelf: 'flex-start', color: '#0D5813', background: 'transparent', marginLeft: '20px'}}>back to search results</Button>
    <Wrap>
      <Item style={{padding: '40px'}}>
        <img style={{width: '300px'}} size='small' src={displayBook.url} alt="book"/>
      </Item>
      <Item.Content style={{display: 'flex', flexDirection: 'column', justifyItems: 'left', padding: '40px', width: '500px'}}>
        {/* <Button style={{alignSelf: 'flex-end', width: '100px'}}floated='right'>Purchase</Button> */}
        <Item.Header><h2 style={{fontSize: '1.5rem'}}>{displayBook.title}</h2></Item.Header>
        <Item.Description style={{paddingTop: '5px'}}><strong>{displayBook.author}</strong></Item.Description>
        <Item.Header style={{paddingTop: '5px'}}>{displayBook.publisher} {displayBook.published}</Item.Header>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Card.Content extra style={{display: 'flex', alignContent: 'center', paddingTop: '5px'}}>
            {/* <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' /> */}
            <span style={{width: '50px'}}><img style={{width: '100px'}} src={stars} alt="star"/></span>
            <span style={{paddingLeft: '60px'}}> {displayBook.reviews ? displayBook.reviews.length : 0} Reviews</span>
          </Card.Content>
          {/* <p style={{padding: '0px 0 0 60px'}}> {displayBook.reviews ? displayBook.reviews.length : 0} Reviews</p> */}
        </div>
          {/* <Item.Description><strong>Description:</strong></Item.Description> */}
          {/* <p>{displayBook.description}</p> */}
          <Form />
          <button className='button-style' style={{background: '#0D5813'}}>Add To My Books</button>
          <Link to={`/${id}/addreview`}><button className='button-style' onClick={handleAddReview} style={{background: '#BF9018'}}>Add A Review</button></Link>
      </Item.Content>
    </Wrap>
    <div>
      <ReviewHeader style={{width:'50%', margin: '0 auto'}}>
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