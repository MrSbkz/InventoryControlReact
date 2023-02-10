import React from 'react';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import PositionedSnackbar from "../../Common/PositionedSnackbar";

const Login = (props) => {
    const onUsernameChange = (e) => {
        props.updateUserNameText(e.target.value)
    }
    const onPasswordChange = (e) => {
        props.updatePassText(e.target.value)
    }
    const submitForm = () => {
        props.resetAuthErrors();
        props.login(props.userNameText, props.passText);
    }
    
    return (
        <>
            {props.errors.map((e, index) => (<PositionedSnackbar resetErrors={props.resetAuthErrors} key={index} index={index} message={e}/>))}
            <div className='d-flex justify-content-center mt-5'>
                <div className='flex-column'>
                    <MDBInput className='mb-4 mt-5'
                              type='username'
                              id='username'
                              label={props.localization?props.localization.username:''}
                              onChange={onUsernameChange}
                              value={props.userNameText}
                              autoFocus
                    />
                    <MDBInput className='mb-4 d-flex justify-content-center'
                              type='password'
                              id='password'
                              label={props.localization?props.localization.password:''}
                              onChange={onPasswordChange}
                              value={props.passText}
                    />
                    <MDBBtn type='submit' block className='mt-2' onClick={submitForm}>
                        {props.localization.signIn}
                    </MDBBtn>
                </div>
            </div>
        </>
    )
}

export default Login
