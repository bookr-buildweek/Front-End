import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/header/Header';
import TabNav from './components/header/TabNav';
// import AppRouter from './components/AppRouter';
// import { Switch, Route } from 'react-router-dom';
import Banner from './components/header/Banner';
import BookList from './components/main/BookList';
import UserPage from './components/user/UserPage';
import BookPage from './components/main/BookPage';
import AddReview from './components/main/AddReview';
import Filter from './components/main/Filter';

export default function Home() {
    return (
        
        <div>
            <TabNav />
            <Banner />

            <Switch>
                <Route path='/user' component={UserPage} />
                <Route path='/:id/addreview' exact render={props => 
                    <div>
                    <AddReview {...props} />
                    </div>
                }/>
                <Route path='/books/:category' render={props => 
                   <div>
                     <BookList {...props} />
                     </div>
                     } 
                   
                />
                <Route path='/:id' exact render={props => 
                         <div>
                         <BookPage {...props} />
                         </div>
                }/>
                <Route path='/' exact render={() => 
                    <div>
                    <Filter />
                    </div>
                } />
                
            </Switch>
        </div>
)
}
