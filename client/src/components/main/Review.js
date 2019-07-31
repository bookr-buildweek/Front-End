import React, { useContext, useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import axiosWithAuth from '../../axiosWithAuth';

import ThreeStar from '../../assets/3_stars.png';
import OneStar from '../../assets/1_star.png';
import TwoStar from '../../assets/2_stars.png';
import FourStar from '../../assets/4_stars.png';
import FiveStar from '../../assets/5_stars.png';
import { UserContext } from './../contexts/UserContext';

function Review({ review }) {
  console.log('REVIEWER', review.reviewer)
  const userId = review.reviewer;
  // const user = useContext(UserContext);
  const [user, setUser] = useState('')
  useEffect(() => {
    axiosWithAuth()
    .get(`https://bookr-bw.herokuapp.com/api/users/${userId}`)
    .then(response => {
      const str = response.data.first_name + " " + response.data.last_name;
      setUser(str)
    })
    .catch(error => { 
      console.error('Server Error', error);
    });
  })
  return (
    <div style={{border: '1px solid transparent', margin: '0px 0 10px 0', padding: '20px', background: '#FFF8E6'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h4 style={{marginBottom: '5px'}}>{user}</h4>
          <div>
            {/* <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' />
            <Icon name='star outline' /> */}
            <img style={{width: '100px'}} src={FiveStar} alt="star"/>
          </div>
      </div>
      <p style={{marginTop: '10px'}}>{review.review}</p>
    </div>
  )
}

export default Review;