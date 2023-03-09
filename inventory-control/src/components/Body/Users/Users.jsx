import React from 'react';
import {AddEditButton} from "./AddEditButton";
import {MDBBtn, MDBCheckbox, MDBCol, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {Pagination} from "@mui/material";
import PositionedSnackbar from "../../Common/PositionedSnackbar";

const Users = (props) => {
    const users = props.users.map((u, indexUser) => (
        <tr key={indexUser} className={!u.isActive ? 'table-secondary' : ''}>
            <td>
                <div className="d-flex align-items-center">
                    <div>
                        <p className="fw-bold mb-0">{u.firstName} {u.lastName}</p>
                        <p className="text-muted mb-0">{u.userName}</p>
                    </div>
                </div>
            </td>
            <td>
                {
                    u.roles.map((r, indexRole) => (
                        <p key={indexRole} className="fw-normal mb-0">{r}</p>
                    ))
                }
            </td>
            <td>
                <div className="fw-normal mb-1">
                    <AddEditButton
                        className="btn-sm"
                        btnName={props.localization.edit}
                        title={props.localization.editUser}
                        localization={props.localization}
                        resetUserData={props.resetUserData}
                        setUserData={props.setUserData}
                        user={u}
                        isAdding={false}
                        rounded={true}
                        outline={false}
                        saveChanges={props.saveChanges}
                    />
                </div>
                <div className="fw-normal mb-1">
                    {
                        u.isActive
                            ? <MDBBtn
                                color='danger'
                                rounded
                                size='sm'
                                onClick={() => props.makeUserInactive(u.userName, props.currentPage, props.searchString, props.showInactiveUsers)}
                            >
                                {props.localization.makeInactive}
                            </MDBBtn>
                            : <MDBBtn
                                color='success'
                                rounded
                                size='sm'
                                onClick={() => props.restoreUser(u.userName, props.currentPage, props.searchString, props.showInactiveUsers)}
                            >
                                {props.localization.restore}
                            </MDBBtn>
                    }

                </div>
            </td>
        </tr>
    ));

    return (
        <>
            {props.errors.map((e, index) => (
                <PositionedSnackbar resetErrors={props.resetUserErrors} key={index} index={index} message={e}/>))}
            <MDBRow className="mt-2 mb-2">
                <MDBCol size='md'>
                    <AddEditButton
                        className="btn-outline-success"
                        btnName=''
                        title={props.localization.addUser}
                        localization={props.localization}
                        resetUserData={props.resetUserData}
                        setUserData={() => true}
                        isAdding={true}
                        rounded={true}
                        outline={true}
                        saveChanges={props.saveChanges}
                    />
                </MDBCol>
                <MDBCol size='md'>
                    <MDBCheckbox
                        name='flexCheck'
                        checked={props.showInactiveUsers}
                        onChange={() => props.onShowInactiveUsers()}
                        id='flexCheckDefault'
                        label={props.localization.showInactiveUsers}
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
                               onChange={(e) => props.updateSearchString(e.target.value)}
                        />
                        <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search" 
                           onClick={() => props.getUsers(props.currentPage, props.searchString, props.showInactiveUsers)}
                           style={{cursor: "pointer"}}></i>
                    </span>
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBTable align='middle'>
                <MDBTableHead className='bg-light'>
                    <tr>
                        <th>{props.localization.nameTable}</th>
                        <th>{props.localization.roles}</th>
                        <th>{props.localization.actions}</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users}
                </MDBTableBody>
            </MDBTable>
            <MDBRow className='d-flex justify-content-center'>
                <MDBCol md='6' className='mt-5'>
                    <Pagination
                        page={props.currentPage}
                        count={props.totalPages}
                        onChange={(e, page) => props.getUsers(page, props.searchString, props.showInactiveUsers)}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};

export default Users;
