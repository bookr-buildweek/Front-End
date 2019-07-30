import React from 'react'

export default function DisplayReview(props) {
    return (
        <div>
            <p>Rating: {props.book.ratings}</p>
            <p>Review: {props.book.review}</p>
        </div>
    )
}
