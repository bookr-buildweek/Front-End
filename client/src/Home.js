import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import TabNav from './components/header/TabNav';
import axiosWithAuth from './axiosWithAuth'
import Banner from './components/header/Banner';
import BookList from './components/main/BookList';
import UserPage from './components/user/UserPage';
import BookPage from './components/main/BookPage';
import AddReview from './components/main/AddReview';
import Filter from './components/main/Filter';
import { UserContext } from './components/contexts/UserContext';

export default function Home() {
    const id = localStorage.getItem('reviewer')
    const [ user, setUser] = useState({first_name: ''}) 
    // console.log(id);
    useEffect( () => {
        axiosWithAuth()
        .get(`https://bookr-bw.herokuapp.com/api/users/${id}`)
        .then(res => {
        console.log(res.data);
        setUser(res.data)
        })
    }, [id])
    return (
        
        <div>
            <UserContext.Provider value={user}>
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
            </UserContext.Provider>
        </div>
)
}
