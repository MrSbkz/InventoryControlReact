import React from 'react';
import Box from "@mui/material/Box";
import DeviceForm from "./DeviceForm";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdb-react-ui-kit";

const DeviceBox = (props) => {
    const onChangeDeviceName = (e) => {
        props.changeDeviceName({
            id: props.deviceInfo.id,
            name: e.target.value,
        });
    }

    return (
        <Box sx={{margin: 1}}>
            <DeviceForm
                name={props.deviceInfo.name}
                changeDeviceName={onChangeDeviceName}
                users={props.users}
                localization={props.localization}
                assignedUser={props.device.assignedTo}
            />
            <MDBRow>
                <MDBCol>
                    <MDBBtn
                        className='primary'
                        rounded
                        size="sm"
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
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
        </Box>
    );
}

export default DeviceBox;