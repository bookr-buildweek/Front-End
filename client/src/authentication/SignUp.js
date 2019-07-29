import React, { useState } from 'react';
import axios from 'axios'

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
                <div className='form-wrapper'>                    
                    <form onSubmit={(e) => submitHandler(e, state)}>               
                        <input 
                            type="text" 
                            name="first_name" 
                            placeholder="Register A Username"
                            value={state.first_name}
                            onChange={changeHandler}
                        />
                        <input 
                            type="text" 
                            name="last_name" 
                            placeholder="Register A Username"
                            value={state.last_name}
                            onChange={changeHandler}
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Register A Username"
                            value={state.email}
                            onChange={changeHandler}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            value={state.password}
                            onChange={changeHandler} 
                            placeholder="Register A Password"
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