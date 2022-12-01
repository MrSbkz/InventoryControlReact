﻿import React from 'react';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import PositionedSnackbar from "../../Common/PositionedSnackbar";

const Login = (props) => {
    const onUsernameChange = (e) => {
        props.updateUsernameText(e.target.value)
    }
    const onPasswordChange = (e) => {
        props.updatePassText(e.target.value)
    }
    const submitForm = () => {
        props.resetAuthErrors();
        props.login(props.usernameText, props.passText);
    }
    
    return (
        <>
            {props.errors.map((e, index) => (<PositionedSnackbar resetAuthErrors={props.resetAuthErrors} key={index} index={index} message={e}/>))}
            <div className='d-flex justify-content-center mt-5'>
                <div className='flex-column'>
                    <MDBInput className='mb-4 mt-5'
                              type='username'
                              id='username' label='Username'
                              onChange={onUsernameChange}
                              value={props.usernameText}
                              autoFocus
                    />
                    <MDBInput className='mb-4 d-flex justify-content-center'
                              type='password'
                              id='password' label='Password'
                              onChange={onPasswordChange}
                              value={props.passText}
                    />
                    <MDBBtn type='submit' block className='mt-2' onClick={submitForm}>
                        Sign in
                    </MDBBtn>
                </div>
            </div>
        </>
    )
}

export default Login
