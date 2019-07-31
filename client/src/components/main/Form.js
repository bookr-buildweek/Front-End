import React, { useState, useEffect } from 'react';
import { Button, Image, Item, Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import axiosWithAuth from '../../axiosWithAuth';

function Form({ history, match }) {
  // const id = match.params.id;
  const [review, setReview] = useState({reviewer: '', ratings: '', review: ''});
  const [displayBook, setDisplayBook] = useState(null);
  // const [bookID, setBookID] = useState({book_id: id});
  const [bookReview, setBookReview] = useState([]);

  useEffect(() => {
    // const reviewID = JSON.parse(localStorage.getItem('reviewer'));
    // setReview({...review, reviewer: reviewID})
    // axiosWithAuth()
    // .get(`https://bookr-bw.herokuapp.com/api/books/${id}`)
    // .then(response => {
    //   setDisplayBook(response.data);

    //   // This will let us grab reviews by ID to be mapped out for My Page, just need to change the number 
    //   // axiosWithAuth()
    //   // .get('https://bookr-bw.herokuapp.com/api/user/10/reviews')
    //   // .then(res => {
    //   //   console.log(res);
    //   // })
    //   // .catch(err => {
    //   //   console.log(err)
    //   // })

    // })
    // .catch(error => { 
    //   console.error('Server Error', error);
    // });
  
  }, [])


  function handleChange(e) {
    setReview({
      ...review, 
      [e.target.name]: e.target.value
  });
  }

  function handleSubmit(e) {
    e.preventDefault()
    axiosWithAuth()
        // .post(`https://bookr-bw.herokuapp.com/api/books/${bookID.book_id}/review`, review)
        .then(res => {
          // localStorage.setItem('reviewID', res.data.id)
          setBookReview([...bookReview, res.data[0] ])
        })
        .catch(err => {
          console.log(err)
        });
    };
  
  return (
    <div>
      <p style={{marginTop: '10px'}}>Enter your review here</p>
    <form id="form" onSubmit={handleSubmit} style={{border: '1px solid transparent'}}>
    {/* <fieldset> */}
      {/* <legend>Add a Review</legend> */}
      {/* <div >
        <label>
          Rating
          <div>
            <input
              type="text"
              name="ratings"
              value={review.ratings}
              placeholder="Enter your rating"
              onChange={handleChange}
            />
          </div>
        </label>
      </div> */}
      <div>
        {/* <label>Review</label> */}
        <input style={{width: '300px', height: '150px'}}
          type="review"
          name="review"
          value={review.review}
          aria-describedby="emailHelp"
          // placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      {/* <button type="submit">
        Save Review
      </button> */}
    {/* </fieldset> */}
  </form>
  </div>
  )
}

export default Form;