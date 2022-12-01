import React from 'react';
import {connect} from 'react-redux';
import Users from "./Users";
import AccessError from "../../Common/AccessError";


class UsersContainer extends React.Component {
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
        roles: state.authReducer.roles,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

