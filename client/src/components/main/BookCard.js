import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

function BookCard ({ book }) {
console.log(book)
  return (
    <Card style={{width: '250px', height: '350px', fontSize: '12px', textAlign: 'left'}}>
    {/* <Image style={{width: '150px', height: '200px', textAlign: 'center', margin: '0 auto'}}src={book.volumeInfo.imageLinks.thumbnail} wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>{book.title}</Card.Header>
      <Card.Meta>
        <span>by {book.author}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>

        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />
        <Icon name='star outline' />

    </Card.Content>
  </Card>
  )
}

export default BookCard;