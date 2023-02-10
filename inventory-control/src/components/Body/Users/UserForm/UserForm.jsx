import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

const UserForm = (props) => {
    const roles = props.roles.map((r, index) => (
        <MDBCheckbox
            key={index}
            name='flexCheck'
            value={r}
            label={r}
            checked={props.userRoles.includes(r)}
            onChange={(e) => props.updateRoles(e.target.value)}
        />
    ));
    return (
        <div>
            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBInput
                        label={props.localization.firstName}
                        value={props.firstNameText}
                        onChange={(e) => props.updateFirstName(e.target.value)}
                    />
                </MDBCol>
                <MDBCol>
                    <MDBInput
                        label={props.localization.lastName}
                        value={props.lastNameText}
                        onChange={(e) => props.updateLastName(e.target.value)}
                    />
                </MDBCol>
            </MDBRow>
            <MDBInput
                disabled={!props.isAdding}
                wrapperClass='mb-4'
                label={props.localization.userName}
                value={props.userNameText}
                onChange={(e) => props.updateUsername(e.target.value)}
            />
            <div className='ml-5'>
                <h5 className='ml-5'>{props.localization.roles}:</h5>
                {roles}
            </div>
            {
                props.isAdding &&
                <>
                    <MDBInput
                        type='password'
                        wrapperClass='mt-4 mb-4'
                        label={props.localization.password}
                        value={props.passwordText}
                        onChange={(e) => props.updatePassword(e.target.value)}
                    />
                    <MDBInput
                        type='password'
                        wrapperClass='mb-4'
                        label={props.localization.confirmPassword}
                        value={props.passwordConfirmText}
                        onChange={(e) => props.updatePasswordConfirm(e.target.value)}
                    />
                </>
            }
        </div>
    )
}

export default UserForm;