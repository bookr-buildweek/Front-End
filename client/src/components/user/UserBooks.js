import React from 'react';
import styled from 'styled-components';

function UserBooks(props) {
    const {book} = props;

    const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        // margin-left: 25%;
    `
    const Img = styled.img`
        width: 220px;
        height: 320px;
        padding: 5px;
    `
    const H3 = styled.h3`
        font-family: Roboto, sans serif;
        font-weight: 700;
        color: #332706;
        font-size: 1.5rem;
        line-height: 40px;
        width: 400px;
    `
    const P = styled.p`
        font-family: Roboto, sans serif;
        font-size: 1rem;
        line-height: 21px;
        color: #332706;
    `
    return (
        <Wrapper>
            <Img src={book.url} alt="book" style={{paddingRight: '10px'}}/>
            <div>
                <H3>{book.title}</H3>
                <P>by <strong>{book.author}</strong></P>
                <P>{book.publisher} {book.published.slice(0, 4)}</P>
            </div>
        </Wrapper>
    );
}

export default UserBooks;