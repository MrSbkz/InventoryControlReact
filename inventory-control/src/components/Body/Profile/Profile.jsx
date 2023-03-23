import React from 'react';
import {MDBTable, MDBTableHead, MDBTableBody, MDBBtn} from 'mdb-react-ui-kit';
import DeviceHistoryContainer from "../../Common/DeviceHistoryContainer";

const Profile = (props) => {
    return (
        <div>
            <h2>{props.user.firstName} {props.user.lastName}</h2>
            <h6><em>{props.localization.userName}</em>: {props.user.userName}</h6>
            <h6><em>{props.localization.roles}</em>: {props.user.roles.map((r,i) => i > 0 ? `, ${r}` : r)}</h6>
            <h3 className='mt-5'>{props.localization.devices}:</h3>
            <MDBTable >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>{props.localization.deviceName}</th>
                        <th scope='col'>{props.localization.registrationDate}</th>
                        <th scope='col'>{props.localization.actions}</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {props.userDevices.map((d, index) => {
                        return <tr key={index}>
                            <th scope='row'>{d.id}</th>
                            <td>{d.name}</td>
                            <td>{d.registerDate}</td>
                            <td>
                                <DeviceHistoryContainer 
                                    deviceId={d.id}
                                />
                            </td>
                        </tr>
                    })}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default Profile;