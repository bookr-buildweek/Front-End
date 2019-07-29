import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import TabNav from './components/header/TabNav';
import AppRouter from './components/AppRouter';

function App() {
const [tempItem, setTempItem] = useState(
  {id: '0',
  volumeInfo: {
    title: "Free-Motion Quilting with Angela Walters",
    authors: ["Angela Walters"],
    imageLinks: {
      thumbnail: "http://books.google.com/books/content?id=Ym4usUyOmNEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    publisher: "C&T Publishing Inc",
    publishedDate: "2012-06-01",
    description: "Popular machine quilter Angela Walters will motivate you to try something new! Learn to stitch her fresh continuous-line designs on your longarm or domestic machine. Includes step-by-step instructions for continuous-line swirls, circles, squares, vines, arcs, and points. Using basic free-motion skills you already have, discover how to approach quilting a modern quilt by working with bold fabrics and negative space, uniting a variety of shapes, and blending designs. Draw inspiration from striking pictures of 20 modern quilts showing Angela’s designs. You’ll love her practical advice for choosing the perfect pattern to give your modern quilt maximum impact.",
    reviews: [{name: 'Leana Neparidze', review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}, 
               {name: 'Anna Smith', review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }],
    rating: null,
    industryIdentifiers: [
      {identifier: "9781607055365"}
    ]
  }
  }
)
  return (
    <div className="App">
      <Header />
      <TabNav />
      <AppRouter tempItem={tempItem} setTempItem={setTempItem}/>
    </div>
  );
}

export default App;
