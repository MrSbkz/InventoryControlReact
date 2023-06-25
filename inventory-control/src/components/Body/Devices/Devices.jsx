import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeviceRow from "./DeviceRow";
import {AddDeviceButton} from "./AddDeviceButton";
import {Pagination} from "@mui/material";
import {MDBCheckbox, MDBCol, MDBRow} from "mdb-react-ui-kit";

const Devices = (props) => {
    console.log(props.deviceNames)
    return (
        <>
            <MDBRow className="mt-2 mb-2">
                <MDBCol size='md'>
                    <AddDeviceButton
                        localization={props.localization}
                        users={props.users}
                        addDevice={props.addDevice}
                        changeNewDeviceName={props.changeNewDeviceName}
                        newDeviceName={props.newDeviceName}
                        changeNewDeviceAssignment={props.changeNewDeviceAssignment}
                        newDeviceAssignment={props.newDeviceAssignment}
                    />
                </MDBCol>
                <MDBCol size='md'>
                    <MDBCheckbox
                        name='flexCheck'
                        checked={props.showDecommissionDevice}
                        onChange={() => props.onShowDecommissionDevices()}
                        id='flexCheckDefault'
                        label={props.localization.showDecommissionDevices}
                    />
                    <MDBCheckbox
                        name='flexCheck'
                        checked={props.showUnassignedDevices}
                        onChange={() => props.onShowUnassignedDevices()}
                        id='flexCheckDefault1'
                        label={props.localization.showUnassignedDevices}
                    />
                </MDBCol>
                <MDBCol size='md'>
                    <div className="input-group rounded">
                        <input type="search"
                               className="form-control rounded"
                               placeholder={props.localization.search}
                               aria-label={props.localization.search}
                               aria-describedby="search-addon"
                               value={props.searchString}
                               onChange={(e) => props.updateSearchDeviceString(e.target.value)}
                        />
                        <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"
                           onClick={() => props.getDevices(props.currentPage, props.searchString, props.showDecommissionDevice, props.showUnassignedDevices)}
                           style={{cursor: "pointer"}}></i>
                    </span>
                    </div>
                </MDBCol>
            </MDBRow>
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
                                    changeDeviceName={props.changeDeviceName}
                                    downloadQRCode={props.downloadQRCode}
                                    changeDeviceAssignment={props.changeDeviceAssignment}
                                    updateDevice={props.updateDevice}
                                    setDeviceAssignments={props.setDeviceAssignments}
                                    deviceAssignments={props.deviceAssignments}
                                    decommissionDevice={props.decommissionDevice}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <MDBRow className='d-flex justify-content-center'>
                <MDBCol md='6' className='mt-5'>
                    <Pagination
                        page={props.currentPage}
                        count={props.totalPages}
                        onChange={(e, page) => props.getDevices(page, props.searchString, props.showDecommissionDevice, props.showUnassignedDevices)}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
}

export default Devices;
