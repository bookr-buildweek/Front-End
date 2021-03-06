import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
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
  const [errorMessage, setErrorMessage] = useState('hidden');

  useEffect(() => {
    const reviewID = JSON.parse(localStorage.getItem('reviewer'));
    setReview({...review, reviewer: reviewID})
    axiosWithAuth()
    .get(`https://bookr-bw.herokuapp.com/api/books/${id}`)
    .then(response => {
      setDisplayBook(response.data);
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
          setBookReview([...bookReview, res.data[0] ])
          setSubmitted(!submitted);
          setFormClass('hidden');
          setButtonClass('visible');
          setMessageClass('visible');
          setTimeout(() => {
            setMessageClass('hidden');
          }, 3000)
          setReview({reviewer: '', ratings: '', review: ''});
          setEmptyStar(['star outline', 'star outline', 
          'star outline', 'star outline', 'star outline']);
        })
        .catch(err => {
          console.log(err)
          setFormClass('hidden');
          setErrorMessage('visible');
          setTimeout(() => {
            setErrorMessage('hidden');
          }, 3000)
          setButtonClass('visible');
          setReview({reviewer: '', ratings: '', review: ''});
          setEmptyStar(['star outline', 'star outline', 
          'star outline', 'star outline', 'star outline']);
        });
        console.log('REVIEW', review)
    };

    function handleStarClick(e, val) {
      e.preventDefault();
      console.log('index', emptyStar[0])
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
        <input style={{width: '300px', height: '150px', fontSize: '1.2rem'}}
          type="review"
          name="review"
          value={review.review}
          onChange={handleChange}
        />
      </div>
        <label>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', width: '300px'}}>
            <h4>How many stars?</h4>
            <span style={{display: 'flex'}}>
              <div><Icon  onClick={(e) => handleStarClick(e, indexes[0])} style={{fontSize: '1rem'}} value={indexes[0]} name={emptyStar[0]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[1])} style={{fontSize: '1rem'}} value={indexes[1]} style={{fontSize: '1rem'}} name={emptyStar[1]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[2])} style={{fontSize: '1rem'}} value={indexes[2]} style={{fontSize: '1rem'}} name={emptyStar[2]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[3])} style={{fontSize: '1rem'}} value={indexes[3]} style={{fontSize: '1rem'}} name={emptyStar[3]} /></div>
              <div><Icon onClick={(e) => handleStarClick(e, indexes[4])} style={{fontSize: '1rem'}} value={indexes[4]} style={{fontSize: '1rem'}} name={emptyStar[4]} /></div>
            </span>
            </div>
        </label>
      <p className={`${messageClass}`}style={{color: 'green', fontSize: '1rem', paddingLeft: '10px'}}>Your review was submitted! <Icon name='check' /></p>
      <p className={`${errorMessage}`}style={{color: 'red', fontSize: '1rem', paddingLeft: '10px'}}>Must fill out form or form was already submitted.</p>
      <button className='button-style' type="submit"
              style={{background: '#BF9018', marginLeft: '8px'}}>Add A Review</button>
  </form>
  </div>
  )
}

export default Form;