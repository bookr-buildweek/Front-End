import React, { useState, useEffect, useContext } from 'react';
import axiosWithAuth from '../../axiosWithAuth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import UserBooks from './UserBooks';
import { UserContext } from '../contexts/UserContext';

function UserPage() {
  const H1 = styled.h1`
    font-family: Roboto, sans-serif;
  `
  const user = useContext(UserContext);
  const id = localStorage.getItem('reviewer')
  // console.log('local', id)
  // console.log('this is context api',user)
  const [ userFavorites, setUserFavorites] = useState([]);
  const [tf ,setTF] = useState(false);
  const [error, setError] = useState(false)

  // const [ user, setUser] = useState({first_name: ''}) 
  // console.log(id);
  // useEffect( () => {
  //   axiosWithAuth()
  //     .get(`https://bookr-bw.herokuapp.com/api/users/${id}`)
  //     .then(res => {
  //     console.log(res.data);
  //     setUser(res.data)
  //   })
  // }, [])
  

  useEffect(() => {
      axiosWithAuth()
      .get(`https://bookr-bw.herokuapp.com/api/users/${id}/shelf`)
      .then(res => {
        console.log(res.data)
        setUserFavorites(res.data);
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }, [tf]) 

  const DeleteHandler = (lol) => {
      console.log('inside DeleteHandler')
      axiosWithAuth()
      .delete(`https://bookr-bw.herokuapp.com/api/books/${lol}/shelf`)
      .then(res => {
          console.log('successfully deleted')
          setTF(!tf)
      })
      .catch(err => {
          console.log(err)
      })     
    }

  return (
    <div>
    <H1 style={{marginTop: '0px', paddingTop: '80px'}}>Welcome {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}</H1>
    {error ? <h2>There are no books on your shelf</h2> : userFavorites.map((i , index) => {
      return (
        <div> 
          <Link to={`/books/${i.category}`} key={index} > 
          <UserBooks book={i} key={index} />
          </Link>
          <button onClick={() => DeleteHandler(i.id)}><Icon className='trash' />Delete </button>
        </div>
      )
    })
    }
    </div>
  )
}

export default UserPage;