import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SideBarContainer from "./SideBar/SideBarContainer";
import UsersContainer from "./Admin/UsersContainer";
import NotFound from "../Common/NotFound";

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
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Body;