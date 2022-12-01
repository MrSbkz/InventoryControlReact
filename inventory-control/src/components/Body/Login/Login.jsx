import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';

const Login = (props) => {
    const onUsernameChange = (e) => {
        console.log(props.usernameText)
        props.updateUsernameText(e.target.value)
    }
    const onPasswordChange = (e) => {
        console.log(props.passText)
        props.updatePassText(e.target.value)
    }
    const submitForm = () => {
        props.login(props.usernameText, props.passText);
    }
    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='flex-column'>
                <MDBInput className='mb-4 mt-5'
                          type='email'
                          id='form1Example1' label='Email address'
                          onChange={onUsernameChange}
                          value={props.usernameText}
                          autoFocus
                />
                <MDBInput className='mb-4 d-flex justify-content-center'
                          type='password'
                          id='form1Example2' label='Password'
                          onChange={onPasswordChange}
                          value={props.passText}
                />
                <MDBBtn type='submit' block className='mt-2' onClick={submitForm}>
                    Sign in
                </MDBBtn>
                <div className='text-center text-danger mt-3'>
                     <span>{props.errors.map(e => (<p key={e}>{e}</p>))}</span>
                </div>
            </div>
        </div>
    )
}

export default Login
