import React, { useState } from 'react';
import axios from 'axios'
import axiosWithAuth from '../axiosWithAuth';

export default function SignUp(props)  {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const changeHandler = e => {
        setState({
            ...state, 
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e, state) => {
        e.preventDefault()
        console.log(state)
        axiosWithAuth()
            .post('https://bookr-bw.herokuapp.com/api/login', state)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('reviewer', res.data.user.id)
                props.history.push('/access')                
            })
            .catch(err => {
                console.log(err)
            })
        setState({           
            email: '',
            password: ''
        })
    }

        return (
            <div className='wrapper'>
                <div className='form-wrapper'>                    
                    <form onSubmit={(e) => submitHandler(e, state)}>   
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter Email"
                            value={state.email}
                            onChange={changeHandler}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            value={state.password}
                            onChange={changeHandler} 
                            placeholder="Enter Password"
                            required
                        />
                        <div className="createAccount">
                            <button>Register Account</button>
                        </div>
                    </form>
                </div>                
            </div>
        )
    }