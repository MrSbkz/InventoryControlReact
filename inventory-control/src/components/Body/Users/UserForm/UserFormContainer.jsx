import React from 'react';
import UserForm from "./UserForm";
import {connect} from "react-redux";


class UserFormContainer extends React.Component {
    render() {
        return <UserForm {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        localization: state.localizationReducer.localization,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFormContainer);

