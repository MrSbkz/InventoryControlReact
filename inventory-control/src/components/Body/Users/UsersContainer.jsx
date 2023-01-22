import React from 'react';
import {connect} from 'react-redux';
import AccessError from "../../Common/AccessError";
import Users from "./Users";
import {getUsers, resetUserData, setUserData} from "../../../redux/reducers/user-reducer";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(1);
    }

    render() {
        return (
            <>
                {
                     this.props.roles.includes("admin")
                        ? <Users {...this.props} />
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
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (currentPage) => dispatch(getUsers(currentPage)),
        resetUserData: () => dispatch(resetUserData()),
        setUserData: (user) => dispatch(setUserData(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

