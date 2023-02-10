import React from 'react';
import {connect} from 'react-redux';
import AccessError from "../../Common/AccessError";
import Users from "./Users";
import {
    addUser,
    getUsers,
    resetUserData,
    setUserData,
    updateUser,
    makeUserInactive,
    resetUserErrors,
    updateSearchString,
    changeShowInactiveUsers,
    restoreUser
} from "../../../redux/reducers/user-reducer";


class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.saveChanges = this.saveChanges.bind(this);
        this.onSearchUsers = this.onSearchUsers.bind(this);
        this.onShowInactiveUsers = this.onShowInactiveUsers.bind(this);
    }

    componentDidMount() {
        this.props.getUsers(1, this.props.searchString, this.props.showInactiveUsers);
    }

    onSearchUsers(searchString) {
        this.props.updateSearchString(searchString);
        this.props.getUsers(this.props.currentPage, this.props.searchString, this.props.showInactiveUsers);
    }

    async onShowInactiveUsers() {
        await this.props.changeShowInactiveUsers();
        this.props.getUsers(this.props.currentPage, this.props.searchString, this.props.showInactiveUsers);
    }

    saveChanges(isAdding) {
        let user = {
            userName: this.props.userNameText,
            firstName: this.props.firstNameText,
            lastName: this.props.lastNameText,
            roles: this.props.userRoles,
            isActive: true,
        }
        if (isAdding) {
            user.password = this.props.passwordText;
            this.props.addUser(user);
        } else {
            this.props.updateUser(user);
        }
    }

    render() {
        return (
            <>
                {
                    this.props.roles.includes("admin")
                        ? <Users {...this.props} 
                                 saveChanges={this.saveChanges}
                                 onSearchUsers={this.onSearchUsers}
                                 onShowInactiveUsers={this.onShowInactiveUsers}
                        />
                        : <AccessError/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.userReducer.allRoles,
        localization: state.localizationReducer.localization,
        users: state.userReducer.users,
        currentPage: state.userReducer.currentPage,
        totalPages: state.userReducer.totalPages,
        userNameText: state.userReducer.userNameText,
        firstNameText: state.userReducer.firstNameText,
        lastNameText: state.userReducer.lastNameText,
        passwordText: state.userReducer.passwordText,
        passwordConfirmText: state.userReducer.passwordConfirmText,
        userRoles: state.userReducer.userRoles,
        isLastPage: state.userReducer.isLastPage,
        errors: state.userReducer.userErrors,
        searchString: state.userReducer.searchString,
        showInactiveUsers: state.userReducer.showInactiveUsers,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (currentPage, searchString, showInactiveUsers) => dispatch(getUsers(currentPage, searchString, showInactiveUsers)),
        resetUserData: () => dispatch(resetUserData()),
        setUserData: (user) => dispatch(setUserData(user)),
        addUser: (user) => dispatch(addUser(user)),
        updateUser: (user) => dispatch(updateUser(user)),
        makeUserInactive: (userName, currentPage, searchString, showInactiveUsers) => dispatch(makeUserInactive(userName, currentPage, searchString, showInactiveUsers)),
        resetUserErrors: () => dispatch(resetUserErrors()),
        updateSearchString: (searchString) => dispatch(updateSearchString(searchString)),
        changeShowInactiveUsers: () => dispatch(changeShowInactiveUsers()),
        restoreUser: (userName, currentPage, searchString, showInactiveUsers) => dispatch(restoreUser(userName, currentPage, searchString, showInactiveUsers)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

