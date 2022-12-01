import React from 'react';
import { connect } from 'react-redux';
import Body from "./Body";
import {checkAuthorization, getRoles} from "../../redux/reducers/auth-reducer";
import LoginContainer from "./Login/LoginContainer";

class BodyContainer extends React.Component {
    componentDidMount() {
        this.props.checkAuthorization();
        if(this.props.roles.length === 0){
            this.props.getRoles();
        }
    }

    render() {
        if(!this.props.isAuthorised) return <LoginContainer />
        return <Body {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorised: state.authReducer.isAuthorised,
        roles: state.authReducer.roles,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthorization: () => dispatch(checkAuthorization()),
        getRoles: () => dispatch(getRoles()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyContainer);

