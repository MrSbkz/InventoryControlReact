import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeviceRow from "./DeviceRow";
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import {AddDeviceButton} from "./AddDeviceButton";

const Devices = (props) => {
    return (
        <>
            <div className="row mt-2 mb-2">
                <div className="col-md-4">
                    <AddDeviceButton
                        localization={props.localization}
                        changeDeviceName={props.changeDeviceName}
                        users={props.users}
                    />
                </div>
                <div className="col-md-3 offset-md-4">
                    <div className="input-group rounded">
                        <input type="search"
                               className="form-control rounded"
                               placeholder={props.localization.search}
                               aria-label={props.localization.search}
                               aria-describedby="search-addon"/>
                        <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>{props.localization.deviceName}</TableCell>
                            <TableCell>{props.localization.assignedTo}</TableCell>
                            <TableCell>{props.localization.registrationDate}</TableCell>
                            <TableCell>{props.localization.decommissionDate}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.devices.map((device) => (
                                <DeviceRow
                                    key={device.id}
                                    device={device}
                                    deviceInfo={props.deviceNames.find(x => x.id === device.id)}
                                    users={props.users}
                                    localization={props.localization}
                                    changesDeviceName={props.changesDeviceName}/>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Devices;
