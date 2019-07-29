import React from 'react';
import { Icon } from 'semantic-ui-react';

function Review({ review }) {
  return (
    <div style={{border: '1px solid darkblue', margin: '10px', padding: '20px'}}>
      <h4 style={{marginBottom: '5px'}}>{review.name}</h4>
        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />
      <p style={{marginTop: '10px'}}>{review.review}</p>
    </div>
  )
}

export default Review;