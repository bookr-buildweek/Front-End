import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosWithAuth from '../../axiosWithAuth'
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function BookList({ handleClick }) {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
      axiosWithAuth()
        .get('https://bookr-bw.herokuapp.com/api/books')
        .then(response => {
          console.log(response)
            setBookList(response.data);
          console.log('HERE', response.data)
        })
        .catch(error => { 
          console.error('Server Error', error);
        });
  }, [])
console.log(bookList)
  return (
    <div className="grid-view">
      {bookList.map((book, index) => {
        return <Link to={`/${book.id}`} key={index} ><BookCard book={book}/></Link>
      })}
    </div>
  );
}

export default BookList;