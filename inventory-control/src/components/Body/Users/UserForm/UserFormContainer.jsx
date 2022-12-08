import React from 'react';
import UserForm from "./UserForm";
import {connect} from "react-redux";
import {
    updateFirstName,
    updateLastName,
    updatePassword,
    updatePasswordConfirm,
    updateRoles,
    updateUsername
} from "../../../../redux/reducers/user-reducer";


class UserFormContainer extends React.Component {
    render() {
        return <UserForm {...this.props}/>
    }
}

const mapStateToProps = (state, props) => {
    return {
        localization: state.localizationReducer.localization,
        roles: state.authReducer.roles,
        firstNameText: state.userReducer.firstNameText,
        lastNameText: state.userReducer.lastNameText,
        usernameText: state.userReducer.usernameText,
        passwordText: state.userReducer.passwordText,
        passwordConfirmText: state.userReducer.passwordConfirmText,
        userRoles: state.userReducer.userRoles,
        isAdding: props.isAdding,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFirstName: (firstName) => dispatch(updateFirstName(firstName)),
        updateLastName: (lastName) => dispatch(updateLastName(lastName)),
        updateUsername: (username) => dispatch(updateUsername(username)),
        updatePassword: (password) => dispatch(updatePassword(password)),
        updatePasswordConfirm: (passwordConfirm) => dispatch(updatePasswordConfirm(passwordConfirm)),
        updateRoles: (role) => dispatch(updateRoles(role)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFormContainer);

