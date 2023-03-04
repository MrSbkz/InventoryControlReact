import React from 'react';
import {connect} from 'react-redux';
import AccessError from "../../Common/AccessError";
import Devices from "./Devices";
import {
    changeDeviceName,
    getDevices,
    getUserNames,
    downloadQRCode,
    changeNewDeviceName,
    addDevice,
    changeNewDeviceAssignment,
} from "../../../redux/reducers/device-reducer";


class DevicesContainer extends React.Component {
    componentDidMount() {
        this.props.getDevices(this.props.currentPage, this.props.searchString, this.props.showDecommissionDevice);
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
        currentPage: state.deviceReducer.currentPage,
        totalPages: state.deviceReducer.totalPages,
        searchString: state.deviceReducer.searchString,
        newDeviceName: state.deviceReducer.newDeviceName,
        showDecommissionDevice: state.deviceReducer.showDecommissionDevice,
        newDeviceAssignment: state.deviceReducer.newDeviceAssignment,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDevices: (currentPage, searchString, showDecommissionDevice) => dispatch(getDevices(currentPage, searchString, showDecommissionDevice)),
        getUserNames: () => dispatch(getUserNames()),
        changeDeviceName: (device) => dispatch(changeDeviceName(device)),
        downloadQRCode: (deviceId) => dispatch(downloadQRCode(deviceId)),
        addDevice: (device) => dispatch(addDevice(device)),
        changeNewDeviceName: (deviceName) => dispatch(changeNewDeviceName(deviceName)),
        changeNewDeviceAssignment: (user) => dispatch(changeNewDeviceAssignment(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesContainer);

