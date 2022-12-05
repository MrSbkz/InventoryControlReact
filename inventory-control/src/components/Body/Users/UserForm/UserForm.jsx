import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

const UserForm = (props) => {
    return (
        <div>
            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBInput label={props.localization.firstName} />
                </MDBCol>
                <MDBCol>
                    <MDBInput label={props.localization.lastName} />
                </MDBCol>
            </MDBRow>

            <MDBInput wrapperClass='mb-4' id='form6Example3' label='Company name' />
            <MDBInput wrapperClass='mb-4' id='form6Example4' label='Address' />
            <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='Email' />
            <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Phone' />

            <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' />
        </div>
    )
}

export default UserForm;