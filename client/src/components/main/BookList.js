import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function BookList({ handleClick, tempItem }) {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
      axios
        .get('https://www.googleapis.com/books/v1/volumes?q=quilting')
        .then(response => {
          let bookListCopy = [tempItem];
          response.data.items.forEach(book => {
            bookListCopy.push(book);
            
          })
          setBookList(bookListCopy);

          console.log('HERE', bookList)
        })
        .catch(error => { 
          console.error('Server Error', error);
        });
  }, [])

  return (
    <div className="grid-view">
      {bookList.map((book, index) => {
        return <Link to={`/${book.id}`} onClick={(e) => handleClick}key={index} ><BookCard book={book}/></Link>
      })}
    </div>
  );
}

export default BookList;