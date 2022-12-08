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
import UserFormContainer from "./UserForm/UserFormContainer";


export const AddEditButton = (props) => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => {
        if(!basicModal){
            props.resetUserData();
        }
        props.setUserData(props.user);
        setBasicModal(!basicModal);
    }

    return (
        <>
            <MDBBtn
                onClick={toggleShow}
                className={props.className}
                rounded={props.rounded}
                outline={props.outline}
            >
                {props.isAdding && <MDBIcon fas size='lg' icon="user-plus"/>}
                {props.btnName}
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{props.title}</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={toggleShow}
                            />
                        </MDBModalHeader>
                        <MDBModalBody>
                            <UserFormContainer isAdding={props.isAdding}/>
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

