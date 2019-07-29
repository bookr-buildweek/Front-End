import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Banner from './header/Banner';
import BookList from './main/BookList';
import UserPage from './user/UserPage';
import BookPage from './main/BookPage';
import AddReview from './main/AddReview';

export default function AppRouter({ tempItem, setTempItem }) {

  return <div className="page-view ui bottom attached segment active tab">
    <Switch>
      <Route path='/user' component={UserPage} />
      {/* <Route path='/:id' render={props => <BookPage {...props} tempItem={tempItem}/>} /> */}
      <Route path='/:id/addreview' exact render={props => 
        <div>
          {/* <BookPage {...props} tempItem={tempItem}/> */}
          <AddReview {...props} tempItem={tempItem}/>
        </div>
      }/>
      <Route path='/:id' render={props => <BookPage {...props} tempItem={tempItem}/>} />
      <Route path="/" exact render={() => 
        <div>
          <Banner />
          <BookList tempItem={tempItem}/>
        </div>
      } />
    </Switch>
  </div>

}