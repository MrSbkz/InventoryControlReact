import React from 'react';
import {AddEditButton} from "./AddEditButton";
import {MDBCol, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {Pagination} from "@mui/material";

const Users = (props) => {
    const users = props.users.map((u, indexUser) => (
        <tr key={indexUser}>
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
                    />
                </div>
                <div className="fw-normal mb-1">
                    <button type="button" className="btn btn-danger btn-sm btn-rounded">
                        {props.localization.resetPassword}
                    </button>
                </div>
            </td>
        </tr>
    ));

    return (
        <>
            <div className="row mt-2 mb-2">
                <div className="col-md-4">
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
                    />
                </div>
                <div className="col-md-3 offset-md-4">
                    <div className="input-group rounded">
                        <input type="search"
                               className="form-control rounded"
                               placeholder={props.localization.search}
                               aria-label={props.localization.search}
                               aria-describedby="search-addon"/>
                        <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                    </div>
                </div>
            </div>
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
                        onChange={(e, page)=>props.getUsers(page)}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};

export default Users;
