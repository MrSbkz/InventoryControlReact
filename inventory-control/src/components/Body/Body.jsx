﻿import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SideBarContainer from "./SideBar/SideBarContainer";
import NotFound from "../Common/NotFound";
import UsersContainer from "./Users/UsersContainer";
import DevicesContainer from "./Devices/DevicesContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import Main from "./Main";

const Body = (props) => {
    return (
        <div className="row mt-5">
            {
                props.isAuthorized &&
                <div className="col-lg-3 col-md-4 col-sm-auto col-xl-3">
                    <SideBarContainer/>
                </div>
            }
            <div className="col-lg-9 col-md-8 col-sm-auto col-xl-9 align-middle">
                <div className="justify-content-center">
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/devices' element={<DevicesContainer/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/*' element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Body;