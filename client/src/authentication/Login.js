import React, { useState } from 'react';
import axiosWithAuth from '../axiosWithAuth';

import { Form } from 'semantic-ui-react';

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
                // below is the only way to retrieve the user id from server
                localStorage.setItem('reviewer', res.data.user.id)
                props.history.push('/')                
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
                <div className="signup-text">
                    <h1>Sign in to your account</h1>
                    <p className="green-text">Sign in with Google</p>
                    <p className="green-text">Sign in with Facebook</p>
                </div>
                <Form onSubmit={(e) => submitHandler(e, state)}>
                    <Form.Field>
                        <label style={{textAlign:'left'}}>Email</label>           
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter Email"
                            value={state.email}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{textAlign:'left'}}>Password</label>  
                        <input 
                            type="password" 
                            name="password" 
                            value={state.password}
                            onChange={changeHandler} 
                            placeholder="Enter Password"
                            required
                        />
                    </Form.Field>
                    <button className="signup-btn"
                    style={(state.email && state.password)? {backgroundColor: "#0D5814"}:{backgroundColor: "#85a688"}}>
                    Submit</button>
                    <p className="green-text">Don't have an account yet?</p>
                </Form>
            </div>
        )
    }