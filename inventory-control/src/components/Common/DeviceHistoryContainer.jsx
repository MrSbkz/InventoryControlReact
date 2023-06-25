import React from 'react';
import {connect} from 'react-redux';
import {
    getDeviceHistory,
} from "../../redux/reducers/device-reducer";
import {DeviceHistoryButton} from "./DeviceHistoryButton";


class DeviceHistoryContainer extends React.Component {
    render() {
        return <DeviceHistoryButton {...this.props}/>
    }
}

const mapStateToProps = (state, props) => {
    return {
        deviceHistory: state.deviceReducer.deviceHistory,
        localization: state.localizationReducer.localization,
        deviceId: props.deviceId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDeviceHistory: (deviceId) => dispatch(getDeviceHistory(deviceId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceHistoryContainer);

