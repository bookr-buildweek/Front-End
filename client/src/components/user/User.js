import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function User() {
  const user = useContext(UserContext);

  return (
    <div style={{width: '800px', margin: '0 auto'}}>
      <h1 style={{marginTop: '0px', paddingTop: '80px'}}>Welcome to BOOKR, {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}!</h1>
      <p></p>
    </div>
  )
} 

export default User;