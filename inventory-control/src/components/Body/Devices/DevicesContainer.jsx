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
    changeDeviceAssignment,
    updateDevice,
    setDeviceAssignments,
    updateSearchDeviceString,
    changeShowDecommissionDevices,
    decommissionDevice,
    changeShowUnassignedDevices,
} from "../../../redux/reducers/device-reducer";


class DevicesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onShowDecommissionDevices = this.onShowDecommissionDevices.bind(this);
        this.onShowUnassignedDevices = this.onShowUnassignedDevices.bind(this);
    }
    componentDidMount() {
        this.props.getDevices(this.props.currentPage, this.props.searchString, this.props.showDecommissionDevice, this.props.showUnassignedDevices);
        this.props.getUserNames();
    }

    async onShowDecommissionDevices() {
        await this.props.changeShowDecommissionDevices();
        this.props.getDevices(this.props.currentPage, this.props.searchString, this.props.showDecommissionDevice, this.props.showUnassignedDevices);
    }

    async onShowUnassignedDevices() {
        await this.props.changeShowUnassignedDevices();
        this.props.getDevices(this.props.currentPage, this.props.searchString, this.props.showDecommissionDevice, this.props.showUnassignedDevices);
    }

    render() {
        return (
            <>
                {
                    this.props.roles.includes("accountant")
                        ? <Devices 
                            {...this.props}
                            onShowDecommissionDevices={this.onShowDecommissionDevices}
                            onShowUnassignedDevices={this.onShowUnassignedDevices}
                        />
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
        deviceAssignments: state.deviceReducer.deviceAssignments,
        showUnassignedDevices: state.deviceReducer.showUnassignedDevices,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDevices: (currentPage, searchString, showDecommissionDevice, showUnassignedDevices) => dispatch(getDevices(currentPage, searchString, showDecommissionDevice, showUnassignedDevices)),
        getUserNames: () => dispatch(getUserNames()),
        changeDeviceName: (device) => dispatch(changeDeviceName(device)),
        downloadQRCode: (deviceId) => dispatch(downloadQRCode(deviceId)),
        addDevice: (device) => dispatch(addDevice(device)),
        changeNewDeviceName: (deviceName) => dispatch(changeNewDeviceName(deviceName)),
        changeNewDeviceAssignment: (user) => dispatch(changeNewDeviceAssignment(user)),
        changeDeviceAssignment: (device) => dispatch(changeDeviceAssignment(device)),
        updateDevice: (device) => dispatch(updateDevice(device)),
        setDeviceAssignments: (device) => dispatch(setDeviceAssignments(device)),
        updateSearchDeviceString: (searchString) => dispatch(updateSearchDeviceString(searchString)),
        changeShowDecommissionDevices: () => dispatch(changeShowDecommissionDevices()),
        decommissionDevice: (deviceId) => dispatch(decommissionDevice(deviceId)),
        changeShowUnassignedDevices: () => dispatch(changeShowUnassignedDevices()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesContainer);

