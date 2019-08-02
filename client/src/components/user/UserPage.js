import React, { useState, useEffect, useContext } from 'react';
import axiosWithAuth from '../../axiosWithAuth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import UserBooks from './UserBooks';
import { UserContext } from '../contexts/UserContext';
import Popup from './Popup';

function UserPage() {
  const H1 = styled.h1`
    font-family: Roboto, sans serif;
    font-weight: 700;
    color: #332706;
    font-size: 2rem;
  

  `
  const user = useContext(UserContext);
  const id = localStorage.getItem('reviewer')
  const [ userFavorites, setUserFavorites] = useState([]);
  const [tf ,setTF] = useState(false);
  const [error, setError] = useState(false);

  const [popUp, setPopUp] = useState(false);
  const [bookToDelete, setBookToDelete] = useState();
  

  useEffect(() => {
      axiosWithAuth()
      .get(`https://bookr-bw.herokuapp.com/api/users/${id}/shelf`)
      .then(res => {
        setUserFavorites(res.data);
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }, [tf]) 

  const DeleteHandler = (id_from_array) => {
      console.log('inside DeleteHandler')
      axiosWithAuth()
      .delete(`https://bookr-bw.herokuapp.com/api/books/${id_from_array}/shelf`)
      .then(res => {
          console.log('successfully deleted')
          setTF(!tf)
      })
      .catch(err => {
          console.log(err)
      })
    }

  function togglePopUp(bookId) {
    setPopUp(!popUp);
    setBookToDelete(bookId);
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%',  marginRight: '30px'}}>
    <H1 style={{marginTop: '0px', paddingTop: '10px', paddingLeft: '20%'}}>My Books:</H1>
    {error ? <H1>There are no books on your shelf</H1> : userFavorites.map((i , index) => {
      return (
      <div key={`outerdiv${index}`} style={{width: '100%', background: '#FFF8E6',  margin: '0 30px 10px 0px', paddingLeft: '20%'}}>
      <div key={`div${index}`} style={{display: 'flex', width: '100%', marginRight: '30px'}}> 
          <Link to={`/${i.book_id}`} key={index} > 
            <UserBooks book={i} key={index} />
          </Link>
          {/* Used before creating a popup window <button onClick={() => DeleteHandler(i.id)}><Icon className='trash' />Delete </button> */}
          <Icon key={`trash${index}`} onClick={() => togglePopUp(i.id)} name='trash alternate' size='huge' style={{ color: '#BF9018', cursor: 'pointer', alignSelf: 'flex-end', marginBottom: '5px'}}></Icon>
          {popUp ? 
            <Popup togglePopUp={togglePopUp} DeleteHandler={DeleteHandler} bookToDelete={bookToDelete}/>
            : null
          }
      </div>
      </div>
      )
    })
    }
    </div>
  )
}

export default UserPage;