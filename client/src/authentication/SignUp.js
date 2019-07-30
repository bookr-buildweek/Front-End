import React, { useState } from 'react';
import axios from 'axios'
import { Button, Checkbox, Form } from 'semantic-ui-react';

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
        <div className='wrapper' style={{width:'600px', margin: '100px auto'}}>
            <h1>Create an account</h1>
                <Form onSubmit={(e) => submitHandler(e, state)}>
                    <Form.Field>
                        <label>First Name</label>               
                        <input 
                            type="text" 
                            name="first_name" 
                            placeholder="Register a First name"
                            value={state.first_name}
                            onChange={changeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>  
                        <input 
                            type="text" 
                            name="last_name" 
                            placeholder="Register a Last name"
                            value={state.last_name}
                            onChange={changeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label> 
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Register an email"
                            value={state.email}
                            onChange={changeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label> 
                        <input 
                            type="password" 
                            name="password" 
                            value={state.password}
                            onChange={changeHandler} 
                            placeholder="Register A Password"
                            required
                        />
                    </Form.Field>
                    <Button>Register Account</Button>
                </Form>
        </div>
    )
}