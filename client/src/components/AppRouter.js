import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Banner from './header/Banner';
import BookList from './main/BookList';
import UserPage from './user/UserPage';
import BookPage from './main/BookPage';
import AddReview from './main/AddReview';

export default function AppRouter() {
    console.log("Approuter")

  return <div className="page-view ui bottom attached segment active tab">
    <Switch>
      <Route path='/user' component={UserPage} />
      {/* <Route path='/:id' render={props => <BookPage {...props} tempItem={tempItem}/>} /> */}
      {/* <Route path='/:id' render={props => <BookPage {...props} />} />
      <Route path='/:id/addreview' exact render={props => 
        <div> */}
          {/* <BookPage {...props} tempItem={tempItem}/> */}
          {/* <AddReview {...props} /> */}
        {/* </div> */}
      {/* }/> */}
      {/* <Route path="/" exact render={() => 
        <div>
          <Banner />
          <BookList />
        </div>
      } /> */}
    </Switch>
  </div>
}