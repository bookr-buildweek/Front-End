import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../axiosWithAuth'
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { Button, Item, Card, Icon } from 'semantic-ui-react';

function BookList({ handleClick, match, history }) {
  console.log('MATCH', match)
  const category = match.params.category;
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
    .get('https://bookr-bw.herokuapp.com/api/books')
    .then(response => {
      console.log('DATA', response.data)
      let arr = [];
      response.data.forEach(book => {
        console.log(book);
        if (book.category === category) {
          arr.push(book)
        }
      })
      setBookList(arr);
      // setBookList(response.data)
    })
    .catch(error => { 
      console.error('Server Error', error);
    });
  }, [])

  function ClickHandler() {
    history.push('/')
  }
  
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Button onClick={ClickHandler} style={{alignSelf: 'flex-start', color: '#0D5813', background: 'transparent', marginLeft: '20px'}}>back to home page</Button>
      <i style={{color: ' #BF9018', fontWeight: '500', textAlign: 'center', fontSize: '1.2rem'}}>filtered results</i>
      <div className="grid-view">
        {bookList.map((book, index) => {
          return <Link to={`/${book.id}`} key={index} ><BookCard book={book}/></Link>
        })}
      </div>

    </div>
  );
}

export default BookList;