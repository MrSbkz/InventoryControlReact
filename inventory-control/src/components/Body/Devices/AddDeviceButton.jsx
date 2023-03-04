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
    MDBIcon,
} from 'mdb-react-ui-kit';
import DeviceForm from "./DeviceForm";


export const AddDeviceButton = (props) => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => {
        if (!basicModal) {
        }
        setBasicModal(!basicModal);
    }
    
    const changeDeviceName = (e) => {
        props.changeNewDeviceName(e.target.value);
    }
    
    const addDevice = () => {
        props.addDevice({
            name: props.newDeviceName,
            userName: props.newDeviceAssignment.userName
        });
        toggleShow();
    }

    return (
        <>
            <MDBBtn
                onClick={toggleShow}
                color="success"
                rounded
                outline
            >
                <MDBIcon fas size="lg" icon="plus"/>
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add device</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={toggleShow}
                            />
                        </MDBModalHeader>
                        <MDBModalBody>
                            <DeviceForm
                                localization={props.localization}
                                changeDeviceName={changeDeviceName}
                                users={props.users}
                                name={props.newDeviceName}
                                changeNewDeviceAssignment={props.changeNewDeviceAssignment}
                                assignedUser={props.newDeviceAssignment}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn
                                className='btn-sm'
                                color='danger'
                                outline
                                onClick={toggleShow}
                            >
                                {props.localization.cancel}
                            </MDBBtn>
                            <MDBBtn
                                className='btn-sm'
                                color='info'
                                onClick={addDevice}
                            >
                                {props.localization.saveChanges}
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

