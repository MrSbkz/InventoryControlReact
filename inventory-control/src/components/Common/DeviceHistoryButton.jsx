import React, {useState} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBIcon, MDBTable, MDBTableHead, MDBTableBody,
} from 'mdb-react-ui-kit';


export const DeviceHistoryButton = (props) => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => {
        if (!basicModal) {
        }
        setBasicModal(!basicModal);
    }
    
    const getDeviceHistory = () => {
        toggleShow();
        props.getDeviceHistory(props.deviceId)
    }
    
    const deviceHistory = props.deviceHistory.map((h, i) => (
        <tr key={i}>
            <td>
                {h.action}
            </td>
            <td>
                {h.createdDate}
            </td>
        </tr>
    ))

    return (
        <>
            <MDBBtn
                onClick={getDeviceHistory}
                color="primary"
                rounded
                outline
            >
                {props.localization.history}
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog size="xl" centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{props.localization.deviceHistory}</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='primary'
                                onClick={toggleShow}
                            />
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBTable align='middle'>
                                <MDBTableHead className='bg-light'>
                                    <tr>
                                        <th>{props.localization.action}</th>
                                        <th>{props.localization.date}</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {deviceHistory}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn
                                className='btn-sm'
                                color='danger'
                                outline
                                onClick={toggleShow}
                            >
                                {props.localization.close}
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

