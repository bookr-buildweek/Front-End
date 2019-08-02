import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function User() {
  const user = useContext(UserContext);

  return (
    <div>
      <h1 style={{marginLeft: '20px', paddingTop: '20px'}}>Welcome to BOOKR, {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}!</h1>
      <p></p>
    </div>
  )
} 

export default User;