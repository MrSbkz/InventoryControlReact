import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SideBarContainer from "./SideBar/SideBarContainer";
import NotFound from "../Common/NotFound";
import EmployeesContainer from "./Admin/EmployeesContainer";

const Body = (props) => {
    return (
        <div className="row">
            {
                props.isAuthorised &&
                <div className="col-lg-auto col-md-auto col-sm-auto col-xl-auto">
                    <SideBarContainer/>
                </div>
            }
            <div className="col-lg-auto col-md-auto col-sm-auto col-xl-auto">
                <Routes>
                    <Route path='/employees' element={<EmployeesContainer/>}/>
                    <Route path='/*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Body;