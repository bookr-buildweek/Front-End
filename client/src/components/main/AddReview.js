import React, { useState, useEffect } from 'react';
import { Button, Image, Item, Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import axiosWithAuth from '../../axiosWithAuth';
import DisplayReview from './DisplayReview'
import Review from './Review';

const Wrap = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: left;
`

function AddReview({ history, match }) {
  const id = match.params.id;
  const [review, setReview] = useState({reviewer: '', ratings: '', review: ''});
  const [displayBook, setDisplayBook] = useState(null);
  const [bookID, setBookID] = useState({book_id: id});
  const [bookReview, setBookReview] = useState([]);

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
  
  }, [id])

  function handleClick() {
    history.push(`/${id}`);
  }

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
        })
        .catch(err => {
          console.log(err)
        });
    };

  if (displayBook) {
    return (
      <div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <Button onClick={handleClick} style={{alignSelf: 'flex-start', width: '400px'}}floated='right'>Back to Book Page</Button>
      <Wrap>
        <Item style={{padding: '40px'}}>
          {/* <Item.Image size='small' src={displayBook.volumeInfo.imageLinks.thumbnail} 
                      style={{width: '200px'}}/> */}
        </Item>
        <Item.Content style={{display: 'flex', flexDirection: 'column', justifyItems: 'left', padding: '40px', width: '500px'}}>
          <Button style={{alignSelf: 'flex-end', width: '100px'}}floated='right'>Purchase</Button>
          <Item.Header><h1>{displayBook.title}</h1></Item.Header>
          <Item.Description>by <strong>{displayBook.authors}</strong></Item.Description>
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
          <Item.Header>Publisher: {displayBook.publisher}</Item.Header>
            <Item.Header>Published: {displayBook.publishedDate}</Item.Header>
            <Item.Description>ISBN: {displayBook.isbn}</Item.Description>
            <Item.Description><strong>Description:</strong></Item.Description>
            <p>{displayBook.description}</p>
        </Item.Content>
      </Wrap>
      </div>
            <div>
            Reviews:{bookReview.map(book => <DisplayReview book={book}/> )}
            </div>
          <form id="form" onSubmit={handleSubmit} style={{width: '500px', margin: '0 auto', marginTop: '40px'}}>
          <fieldset>
            <legend>Add a Review</legend>
            <div >
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