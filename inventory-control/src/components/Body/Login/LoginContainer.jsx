import React from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import {login, updateUsernameText, updatePassText, resetAuthErrors} from '../../../redux/reducers/auth-reducer';

class LoginContainer extends React.Component {
    render() {
            if(this.props.localization) return <Login {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.authReducer.authErrors,
        usernameText: state.authReducer.usernameText,
        passText: state.authReducer.passText,
        localization: state.localizationReducer.localization,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password)),
        updateUsernameText: (username) => dispatch(updateUsernameText(username)),
        updatePassText: (password) => dispatch(updatePassText(password)),
        resetAuthErrors: () => dispatch(resetAuthErrors()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

