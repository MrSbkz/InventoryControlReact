import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../../../redux/reducers/auth-reducer';
import SideBar from "./SideBar";
import {changeLanguage} from "../../../redux/reducers/localization-reducer";

class SideBarContainer extends React.Component {
    render() {
            if(this.props.localization) return <SideBar {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        localization: state.localizationReducer.localization,
        languages: state.localizationReducer.languages,
        currentLanguage: state.localizationReducer.currentLanguage,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        changeLanguage: (language) => dispatch(changeLanguage(language)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);