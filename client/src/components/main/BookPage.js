import React, { useState, useEffect } from 'react';
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
import EmptyStars from '../../assets/Stars_initial_state.png';

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
  const id = match.params.id;
  const [submitted, setSubmitted] = useState(false);

  const [displayBook, setDisplayBook] = useState(null);
  const [favorite, setFavorite] = useState({book_id: '', user_id: ''});

  const stars = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar];
  const [ratings, setRatings] = useState();

  const [buttonClass, setButtonClass] = useState('visible');
  const [formClass, setFormClass] = useState('hidden');
  const [messageClass, setMessageClass] = useState('hidden');
  const [bookSavedClass, setBookSavedClass] = useState('none');
  const [message, setMessage] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    axiosWithAuth()
    .get(`https://bookr-bw.herokuapp.com/api/books/${id}`)
    .then(response => {
      setDisplayBook(response.data)
      setRatings(response.data.averageRatings);
    })
    .catch(error => { 
      console.error('Server Error', error);
    });
  
  }, [id, submitted])

  const AddToShelf = () => {
    const userID = localStorage.getItem('reviewer');

    axiosWithAuth()
    .post(`https://bookr-bw.herokuapp.com/api/books/${id}/shelf`, {
      "book_id": displayBook.id,
      "user_id": userID
    })
    .then( res => {
      if (bookSavedClass === 'none') {
        setColor('green');
        setMessage('Book was saved successfully!')
        setBookSavedClass('visible');
        setTimeout(() => {
          setBookSavedClass('none');
        }, 1000);
      }
    })
    .catch(err => {
      if (bookSavedClass === 'none') {
        setColor('red');
        setMessage('Book is already saved!')
        setBookSavedClass('visible');
        setTimeout(() => {
          setBookSavedClass('none');
        }, 1000)
      }
    })
  }

  function handleClick() {
    history.go(-1)
  }

  function handleAddReview(e) {
    e.preventDefault();
    setButtonClass('hidden');
    setFormClass('visible');
  }

  if (displayBook) {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Button onClick={handleClick} style={{alignSelf: 'flex-start', color: '#0D5813', background: 'transparent', marginLeft: '20px', fontSize: '1.2rem'}}>back to search results</Button>
        <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'center', width: '60%', margin: '0 auto'}}>
          <Wrap>
            <div style={{padding: '40px 20px 0 0', height: '600px'}}>
              <img style={{width: '300px'}} size='small' src={displayBook.url} alt="book"/>
            </div>
            <Item.Content style={{display: 'flex', flexDirection: 'column', justifyItems: 'left', padding: '40px 0 0 0', width: '500px', height: '600px'}}>
              <Item.Header><h2 style={{fontSize: '1.5rem'}}>{displayBook.title}</h2></Item.Header>
              <Item.Description style={{paddingTop: '5px', fontSize: '1rem'}}>by <strong>{displayBook.author}</strong></Item.Description>
              <Item.Header style={{paddingTop: '5px', fontSize: '1rem'}}>{displayBook.publisher} {displayBook.published}</Item.Header>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Card.Content extra style={{display: 'flex', alignContent: 'center', paddingTop: '5px'}}>
                  <span style={{width: '50px'}}><img style={{width: '100px'}} src={ratings ? stars[ratings - 1] : EmptyStars} alt="star"/></span>
                  <span style={{paddingLeft: '60px', fontSize: '1rem'}}> {displayBook.reviews ? displayBook.reviews.length : 0} Reviews</span>
                </Card.Content>
              </div>

              <Form id={id} setSubmitted={setSubmitted} submitted={submitted} buttonClass={buttonClass} 
                            setButtonClass={setButtonClass} formClass={formClass} setFormClass={setFormClass}
                            messageClass={messageClass} setMessageClass={setMessageClass} 
              />

              <button className={`${buttonClass}`}
                      onClick={(e) => handleAddReview(e)} 
                      style={{background: '#BF9018', width: '220px', height: '30px', margin: '10px 10px 20px 10px', color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '1.1rem',
                      marginTop: '-40px',}}>
                Add A Review </button>
                <button onClick={AddToShelf} className='button-style' style={{background: '#0D5813', marginTop: '0px'}}>
                Add To My Books</button>
                <p className={`${bookSavedClass}`}style={{color: `${color}`, fontSize: '1rem', paddingLeft: '10px', marginBottom: '30px', }}>
                {message} <Icon name='check' /></p>
             </Item.Content>
          </Wrap>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <ReviewHeader>
              <h2 style={{margin: '10px', color: '#BF9018', fontSize: '2rem', marginLeft: '0'}}>User Reviews</h2>
            </ReviewHeader>
            <ReviewWrap >
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