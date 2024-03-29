﻿import React from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import {login, updateUserNameText, updatePassText, resetAuthErrors} from '../../../redux/reducers/auth-reducer';

class LoginContainer extends React.Component {
    render() {
            if(this.props.localization) return <Login {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.authReducer.authErrors,
        userNameText: state.authReducer.userNameText,
        passText: state.authReducer.passText,
        localization: state.localizationReducer.localization,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userName, password) => dispatch(login(userName, password)),
        updateUserNameText: (userName) => dispatch(updateUserNameText(userName)),
        updatePassText: (password) => dispatch(updatePassText(password)),
        resetAuthErrors: () => dispatch(resetAuthErrors()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

