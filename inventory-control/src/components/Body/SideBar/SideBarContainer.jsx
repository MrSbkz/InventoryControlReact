import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../../../redux/reducers/auth-reducer';
import SideBar from "./SideBar";

class SideBarContainer extends React.Component {
    render() {
        return <SideBar {...this.props} />
    }
}

const mapStateToProps = () => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);

