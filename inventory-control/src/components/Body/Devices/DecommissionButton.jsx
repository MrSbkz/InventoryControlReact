import React, {useState} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalFooter, MDBModalBody,
} from 'mdb-react-ui-kit';


export const DecommissionButton = (props) => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => {
        if (!basicModal) {
        }
        setBasicModal(!basicModal);
    }

    const decommissionDevice = () => {
        props.decommissionDevice();
        toggleShow();
    }

    return (
        <>
            <MDBBtn
                onClick={toggleShow}
                color="danger"
                rounded
                outline
            >
                {props.localization.decommission}
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{props.localization.decommission}?</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={toggleShow}
                            />
                        </MDBModalHeader>
                        <MDBModalBody>
                            {props.localization.decommissionQuestion} {props.deviceName}?
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn
                                className='btn-sm'
                                color='info'
                                outline
                                onClick={toggleShow}
                            >
                                {props.localization.no}
                            </MDBBtn>
                            <MDBBtn
                                className='btn-sm'
                                color='danger'
                                onClick={decommissionDevice}
                            >
                                {props.localization.yes}
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

