import React, { useState } from 'react';
import axios from 'axios'
import { Form } from 'semantic-ui-react';

export default function SignUp(props)  {
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
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
        axios
            .post('https://bookr-bw.herokuapp.com/api/register', state)
            .then(res => {
                console.log(res)
                props.history.push('/login')                
            })
            .catch(err => {
                console.log(err)
            })
        setState({
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        })
    }

    return (
        <div className='wrapper'>
            <div className="signup-text">
                <h1>Create an account</h1>
                <p className="green-text">Sign in with Google</p>
                <p className="green-text">Sign in with Facebook</p>
            </div>
            <Form onSubmit={(e) => submitHandler(e, state)}>
                <Form.Field>
                    <label style={{textAlign:'left'}}>First Name</label>               
                    <input 
                        type="text" 
                        name="first_name" 
                        placeholder="Register a First name"
                        value={state.first_name}
                        onChange={changeHandler}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{textAlign:'left'}}>Last Name</label>  
                    <input 
                        type="text" 
                        name="last_name" 
                        placeholder="Register a Last name"
                        value={state.last_name}
                        onChange={changeHandler}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{textAlign:'left'}}>Email</label> 
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Register an email"
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
                        placeholder="Register A Password"
                        required
                    />
                </Form.Field>
                <button 
                    className="signup-btn"
                    style={(state.first_name && state.last_name && state.email && state.password)? {backgroundColor: "#0D5814"}:{backgroundColor: "#85a688"}}>
                    Submit</button>
                <p className="green-text">Already have an account?</p>
            </Form>
        </div>
    )
}