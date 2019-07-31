import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import ThreeStar from '../../assets/3_stars.png';
import OneStar from '../../assets/1_star.png';
import TwoStar from '../../assets/2_stars.png';
import FourStar from '../../assets/4_stars.png';
import FiveStar from '../../assets/5_stars.png';


function BookCard ({ book }) {
  let arr = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar];
  var stars = arr[Math.floor(Math.random()*arr.length)];
  return (
    <Card style={{width: '200px', height: '320px', fontSize: '12px', textAlign: 'left', boxShadow: '0 1px 3px 0 rgba(191, 175, 134, 0.3), 0 0 0 1px rgba(191, 175, 134, 0.3)'}}>
    <img style={{width: '150px', height: '200px', textAlign: 'center', margin: '0 auto', objectFit: 'contain', padding: '5px'}}src={book.url} alt="book" />
    <Card.Content style={{}}>
      <Card.Header>{book.title}</Card.Header>
      <Card.Meta>
        <span>by</span> <span style={{color: ' #BF9018'}}>{book.author}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>

        {/* <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' /> */}
        <div style={{width: '50px'}}><img style={{width: '100px'}} src={stars} alt="star"/></div>

    </Card.Content>
  </Card>
  )
}

export default BookCard;