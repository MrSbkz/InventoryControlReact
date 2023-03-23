import React from 'react';
import Box from "@mui/material/Box";
import DeviceForm from "./DeviceForm";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import {DecommissionButton} from "./DecommissionButton";
import DeviceHistoryContainer from "../../Common/DeviceHistoryContainer";

const DeviceBox = (props) => {
    const changeDeviceName = (e) => {
        props.changeDeviceName({
            id: props.deviceInfo.id,
            name: e.target.value,
        });
    }

    const changeDeviceAssignment = (user) => {
        props.setDeviceAssignments({
            id: props.device.id,
            user: user,
        });
    }

    const onSaveChanges = () => {
        let assignment = props.deviceAssignments.find(x => x.id === props.device.id);
        props.updateDevice({
            id: props.device.id,
            name: props.deviceInfo.name,
            assignedTo: assignment ? assignment.user.userName : props.device.assignedTo.userName,
        });
    }

    const decommissionDevice = () => {
        props.decommissionDevice(props.device.id);
    }

    return (
        <Box sx={{margin: 1}}>
            <DeviceForm
                name={props.deviceInfo.name}
                changeDeviceName={changeDeviceName}
                users={props.users}
                localization={props.localization}
                assignedUser={props.device.assignedTo}
                changeDeviceAssignment={changeDeviceAssignment}
            />
            <MDBRow>
                <MDBCol>
                    <MDBBtn
                        className='primary'
                        rounded
                        size="sm"
                        onClick={onSaveChanges}
                    >
                        {props.localization.saveChanges}
                    </MDBBtn>
                </MDBCol>
                <MDBCol>
                    <MDBBtn
                        className='btn-success'
                        rounded
                        size="sm"
                        onClick={() => props.downloadQRCode(props.device.id)}
                    >
                        <MDBIcon size='2x' fas icon="qrcode"/>
                    </MDBBtn>{'  '}
                    <DecommissionButton 
                        localization={props.localization}
                        decommissionDevice={decommissionDevice}
                        deviceName={props.device.name}
                    />{'  '}
                    <DeviceHistoryContainer 
                        deviceId={props.device.id}
                    />
                </MDBCol>
            </MDBRow>
        </Box>
    );
}

export default DeviceBox;