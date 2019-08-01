import React, { useState, useEffect } from 'react';
import { Button, Image, Item, Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import axiosWithAuth from '../../axiosWithAuth';

function Form({ id, setSubmitted, submitted, buttonClass, setButtonClass, formClass, setFormClass, messageClass, setMessageClass }) {
 
  const [review, setReview] = useState({reviewer: '', ratings: '', review: ''});
  const [displayBook, setDisplayBook] = useState(null);
  const [bookID, setBookID] = useState({book_id: id});
  const [bookReview, setBookReview] = useState([]);
  const [emptyStar, setEmptyStar] = useState(['star outline', 'star outline', 
                                              'star outline', 'star outline', 'star outline']);
  const [star, setStar] = useState('star');
  const indexes = [0, 1, 2, 3, 4];

  useEffect(() => {
    const reviewID = JSON.parse(localStorage.getItem('reviewer'));
    setReview({...review, reviewer: reviewID})
    axiosWithAuth()
    .get(`https://bookr-bw.herokuapp.com/api/books/${id}`)
    .then(response => {
      setDisplayBook(response.data);

      // This will let us grab reviews by ID to be mapped out for My Page, just need to change the number 
      // axiosWithAuth()
      // .get('https://bookr-bw.herokuapp.com/api/user/10/reviews')
      // .then(res => {
      //   console.log(res);
      // })
      // .catch(err => {
      //   console.log(err)
      // })

    })
    .catch(error => { 
      console.error('Server Error', error);
    });
  
  }, [bookReview])



  function handleChange(e) {
    setReview({
      ...review, 
      [e.target.name]: e.target.value
  });
  }

  function handleSubmit(e) {
    e.preventDefault()
    axiosWithAuth()
        .post(`https://bookr-bw.herokuapp.com/api/books/${bookID.book_id}/review`, review)
        .then(res => {
          // localStorage.setItem('reviewID', res.data.id)
          setBookReview([...bookReview, res.data[0] ])
          setSubmitted(!submitted);
          setFormClass('hidden');
          setButtonClass('visible');
          setMessageClass('visible');
          setTimeout(() => {
            setMessageClass('hidden');
          }, 3000)
        })
        .catch(err => {
          console.log(err)
        });
        console.log('REVIEW', review)
    };

    function handleStarClick(e, val) {
      e.preventDefault();
      console.log('index', emptyStar[0])
      // emptyStar[0] = 'star'
      let arr = []
      emptyStar.forEach((item, i) => {
        if (i <= val) {
          arr.push('star')
        } else {
          arr.push('star outline')
        }
      })
      setEmptyStar(arr);
      setReview({
        ...review, 
        ratings: val + 1
    });
    }
  
  return (
    <div className={`${formClass}`}>
      <h4 style={{marginTop: '10px'}}>Enter your review here</h4>
    <form id="form" onSubmit={handleSubmit} style={{border: '1px solid transparent'}}>
      <div>
        <input style={{width: '300px', height: '150px'}}
          type="review"
          name="review"
          value={review.review}
          onChange={handleChange}
        />
      </div>
        <label>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
            <h4>How many stars?</h4>
            <span style={{paddingRight: '20px', display: 'flex'}}>
              <div><Icon  onClick={(e) => handleStarClick(e, indexes[0])} style={{fontSize: '1rem'}} value={indexes[0]} name={emptyStar[0]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[1])} style={{fontSize: '1rem'}} value={indexes[1]} style={{fontSize: '1rem'}} name={emptyStar[1]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[2])} style={{fontSize: '1rem'}} value={indexes[2]} style={{fontSize: '1rem'}} name={emptyStar[2]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[3])} style={{fontSize: '1rem'}} value={indexes[3]} style={{fontSize: '1rem'}} name={emptyStar[3]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[4])} style={{fontSize: '1rem'}} value={indexes[4]} style={{fontSize: '1rem'}} name={emptyStar[4]} /></div>
            </span>
            </div>
            {/* <div>
              <input
                type="text"
                name="ratings"
                value={review.ratings}
                placeholder="Enter your rating"
                onChange={handleChange}
              />
            </div> */}
         </label>
      <p className={`${messageClass}`}style={{color: 'green', fontSize: '1rem', paddingLeft: '10px'}}>Your review was submitted! <Icon name='check' /></p>
      <button className='button-style' type="submit"
             style={{background: '#BF9018', marginLeft: '8px'}}>Add A Review</button>
  </form>
  </div>
  )
}

export default Form;