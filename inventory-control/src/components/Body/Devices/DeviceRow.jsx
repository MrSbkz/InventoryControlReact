import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import DeviceBox from "./DeviceBox";

const DeviceRow = (props) => {
    const [open, setOpen] = React.useState(false);
    console.log(props.deviceInfo)
    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}
                      style={{cursor: "pointer"}}
                      onClick={() => setOpen(!open)}>
                <TableCell 
                    component="th" 
                    scope="row"
                >
                    {props.device.id}
                </TableCell>
                <TableCell 
                    component="th" 
                    scope="row"
                >
                    {props.device.name}
                </TableCell>
                <TableCell 
                    component="th" 
                    scope="row"
                >
                    {props.device.assignedTo ? props.device.assignedTo.fullName : ''}
                </TableCell>
                <TableCell 
                    component="th"
                    scope="row"
                >
                    {props.device.registerDate}
                </TableCell>
                <TableCell 
                    component="th"
                    scope="row"
                >
                    {props.device.decommissionDate ? props.device.decommissionDate : '--/--'}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell 
                    style={{paddingBottom: 0, paddingTop: 0}}
                    colSpan={6}
                >
                    <Collapse 
                        in={open} 
                        timeout="auto" 
                        unmountOnExit
                    >
                        <DeviceBox 
                            users={props.users}
                            device={props.device}
                            deviceInfo={props.deviceInfo}
                            localization={props.localization}
                            changeDeviceName={props.changeDeviceName}
                            downloadQRCode={props.downloadQRCode}
                            changeDeviceAssignment={props.changeDeviceAssignment}
                            updateDevice={props.updateDevice}
                            setDeviceAssignments={props.setDeviceAssignments}
                            deviceAssignments={props.deviceAssignments}
                            decommissionDevice={props.decommissionDevice}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default DeviceRow;

