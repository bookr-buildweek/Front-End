import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../axiosWithAuth';
import { Link } from 'react-router-dom';
import UserBooks from './UserBooks';

function UserPage() {
  const id = localStorage.getItem('reviewer')
  const [ userFavorites, setUserFavorites] = useState([])
  const [ user, setUser] = useState({first_name: ''}) 
  // console.log(id);
  useEffect( () => {
    axiosWithAuth()
      .get(`https://bookr-bw.herokuapp.com/api/users/${id}`)
      .then(res => {
      console.log(res.data);
      setUser(res.data)
    })
  }, [])
  

  useEffect(() => {
      axiosWithAuth()
      .get(`https://bookr-bw.herokuapp.com/api/users/${id}/shelf`)
      .then(res => {
        console.log(res.data)
        setUserFavorites(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
    <h1 style={{marginTop: '0px', paddingTop: '80px'}}>Welcome {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}</h1>
    {userFavorites.map((i , index) => {
      return <Link to={`/books/${i.category}`} key={index} > <UserBooks book={i}/> </Link>
    })}
    </div>
  )
}

export default UserPage;