import React from 'react';
import { Card } from 'semantic-ui-react';
import ThreeStar from '../../assets/3_stars.png';
import OneStar from '../../assets/1_star.png';
import TwoStar from '../../assets/2_stars.png';
import FourStar from '../../assets/4_stars.png';
import FiveStar from '../../assets/5_stars.png';
import EmptyStars from '../../assets/Stars_initial_state.png';

function BookCard ({ book }) {
  let arr = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar];
  return (
    <Card style={{width: '200px', height: '350px', fontSize: '12px', textAlign: 'left', boxShadow: '0 1px 3px 0 rgba(191, 175, 134, 0.3), 0 0 0 1px rgba(191, 175, 134, 0.3)'}}>
      <img style={{width: '150px', height: '200px', textAlign: 'center', margin: '0 auto', objectFit: 'contain', padding: '5px'}}src={book.url} alt="book" />
      <Card.Content>
        <Card.Header style={{fontSize: '1.2rem'}}>{book.title}</Card.Header>
        <Card.Meta>
          <span style={{fontSize: '1rem'}}>by</span> <span style={{fontSize: '1rem', color: ' #BF9018'}}>{book.author}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
          <div style={{width: '50px'}}><img style={{width: '100px'}} src={book.avgRating ? arr[book.avgRating - 1] : EmptyStars} alt="star"/></div>
      </Card.Content>
    </Card>
  )
}

export default BookCard;