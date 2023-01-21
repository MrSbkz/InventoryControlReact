﻿import React from 'react';
import UsersSelect from "./UsersSelect";
import { MDBCol,  MDBRow} from "mdb-react-ui-kit";
import {Input} from "@mui/material";

const DeviceForm = (props) => {
    return (
        <>
            <MDBRow className='mb-4 mt-3'>
                <MDBCol>
                    <h6>{props.localization.changeDeviceName}</h6>
                    <Input
                        color="primary"
                        size="sm"
                        variant="outlined"
                        autoFocus
                        value={props.name}
                        onChange={(e) => props.onChangeDeviceName(e)}
                    />

                </MDBCol>
                <MDBCol>
                    <h6>{props.localization.assignedTo}</h6>
                    <UsersSelect
                        users={props.users}
                        localization={props.localization}
                        assignedUser={props.assignedUser}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
}

export default DeviceForm;