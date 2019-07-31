import React from 'react';
import { Card } from 'semantic-ui-react';

function UserBooks(props) {
    const {book} = props;

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
                {/* <div style={{width: '50px'}}><img style={{width: '100px'}} src={stars} alt="star"/></div> */}
            </Card.Content>
        </Card>
    );
}

export default UserBooks;