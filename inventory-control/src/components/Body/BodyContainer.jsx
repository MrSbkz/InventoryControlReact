import React from 'react';
import { connect } from 'react-redux';
import Body from "./Body";
import {checkAuthorization, getRoles} from "../../redux/reducers/auth-reducer";
import LoginContainer from "./Login/LoginContainer";
import {setLanguage} from "../../redux/reducers/localization-reducer";

class BodyContainer extends React.Component {
    componentDidMount() {
        this.props.setLanguage();
        this.props.checkAuthorization();
        if(this.props.roles.length === 0){
            this.props.getRoles();
        }
    }

    render() {
        if(!this.props.isAuthorised) return <LoginContainer />
        else if(this.props.localization) return <Body {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorised: state.authReducer.isAuthorised,
        roles: state.authReducer.roles,
        localization: state.localizationReducer.localization,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthorization: () => dispatch(checkAuthorization()),
        getRoles: () => dispatch(getRoles()),
        setLanguage: () => dispatch(setLanguage())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyContainer);

