import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../../axiosWithAuth';
import { Button, Item, Card } from 'semantic-ui-react';
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
  justify-items: center;
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
  const [submitted, setSubmitted] = useState(false);

  const [displayBook, setDisplayBook] = useState(null);
  const [favorite, setFavorite] = useState({book_id: '', user_id: ''});

  const [buttonClass, setButtonClass] = useState('visible');
  const [formClass, setFormClass] = useState('hidden');
  const [messageClass, setMessageClass] = useState('hidden');

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
  
  }, [id, submitted])

  const AddToShelf = () => {
    const userID = localStorage.getItem('reviewer');
    console.log(displayBook)
    axiosWithAuth()
    .post(`https://bookr-bw.herokuapp.com/api/books/${id}/shelf`, {
      "book_id": displayBook.id,
      "user_id": userID
  })
    .then( res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function handleClick() {
    history.go(-1)
  }
  function handleAddReview(e) {
    e.preventDefault();
    console.log('add review clicked');
    setButtonClass('hidden');
    setFormClass('visible');
  }

  if (displayBook) {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <Button onClick={handleClick} style={{alignSelf: 'flex-start', color: '#0D5813', background: 'transparent', marginLeft: '20px'}}>back to search results</Button>
      <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'center', width: '60%', margin: '0 auto'}}>
      <Wrap>
        <Item style={{padding: '40px'}}>
          <img style={{width: '330px'}} size='small' src={displayBook.url} alt="book"/>
        </Item>
        <Item.Content style={{display: 'flex', flexDirection: 'column', justifyItems: 'left', padding: '40px', width: '500px'}}>
          {/* <Button style={{alignSelf: 'flex-end', width: '100px'}}floated='right'>Purchase</Button> */}
          <Item.Header><h2 style={{fontSize: '1.5rem'}}>{displayBook.title}</h2></Item.Header>
          <Item.Description style={{paddingTop: '5px'}}><strong>{displayBook.author}</strong></Item.Description>
          <Item.Header style={{paddingTop: '5px'}}>{displayBook.publisher} {displayBook.published}</Item.Header>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Card.Content extra style={{display: 'flex', alignContent: 'center', paddingTop: '5px'}}>
              <span style={{width: '50px'}}><img style={{width: '100px'}} src={stars} alt="star"/></span>
              <span style={{paddingLeft: '60px'}}> {displayBook.reviews ? displayBook.reviews.length : 0} Reviews</span>
            </Card.Content>
          </div>
            <Form id={id} setSubmitted={setSubmitted} submitted={submitted} buttonClass={buttonClass} 
                          setButtonClass={setButtonClass} formClass={formClass} setFormClass={setFormClass}
                          messageClass={messageClass} setMessageClass={setMessageClass} />
            <button className={`${buttonClass}`}
              onClick={(e) => handleAddReview(e)} 
              style={{background: '#BF9018', width: '220px', height: '30px', margin: '10px', color: 'white',
              border: 'none',
              borderRadius: '20px',
              fontSize: '1.1rem',
              marginTop: '-40px'
            }}>Add A Review</button>
            <button onClick={AddToShelf} className='button-style' style={{background: '#0D5813'}}>Add To My Books</button>
        </Item.Content>
      </Wrap>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <ReviewHeader>
          <h2 style={{margin: '10px', color: '#BF9018', fontSize: '2rem', marginLeft: '0'}}>User Reviews</h2>
        </ReviewHeader>
        <ReviewWrap 
        // style={{width:'70%', margin: '0 auto'}}
        >
          {displayBook.reviews ? displayBook.reviews.map((item, index) => {
            return <Review key={index} review={item}/>
          }) : null} 
        </ReviewWrap>
      </div>
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

// {
//   "id": 3,
//   "isbn": "9781449365035",
//   "title": "Speaking JavaScript",
//   "subtitle": "An In-Depth Guide for Programmers",
//   "author": "Axel Rauschmayer",
//   "publisher": "O'Reilly Media",
//   "published": "2014-02-01T00:00:00.000Z",
//   "description": "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
//   "category": null,
//   "reviews": [
//       {
//           "id": 16,
//           "reviewer": 1,
//           "ratings": 2,
//           "review": "Hard to understand",
//           "book_id": 19
//       }
//   ]
// }