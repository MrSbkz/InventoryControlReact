import React from 'react';
import {connect} from 'react-redux';
import AccessError from "../../Common/AccessError";
import Devices from "./Devices";
import {changesDeviceName, getDevices, getUserNames} from "../../../redux/reducers/device-reducer";


class DevicesContainer extends React.Component {
    componentDidMount() {
        this.props.getDevices();
        this.props.getUserNames();
    }

    render() {
        return (
            <>
                {
                    this.props.roles.includes("accountant")
                        ? <Devices {...this.props} />
                        : <AccessError/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.authReducer.roles,
        localization: state.localizationReducer.localization,
        devices: state.deviceReducer.devices,
        deviceNames: state.deviceReducer.deviceNames,
        users: state.deviceReducer.users,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDevices: () => dispatch(getDevices()),
        getUserNames: () => dispatch(getUserNames()),
        changesDeviceName: (device) => dispatch(changesDeviceName(device)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesContainer);

