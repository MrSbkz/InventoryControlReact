import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import {getUser} from "../../../redux/reducers/user-reducer";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        {
            if (this.props.user)
                return <Profile {...this.props} />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser.user,
        userDevices: state.userReducer.currentUser.devices,
        localization: state.localizationReducer.localization,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

