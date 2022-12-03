import React from 'react';
import {connect} from 'react-redux';
import {NavLink, useLocation} from "react-router-dom";
import {MenuItem} from "react-pro-sidebar";

const SidebarMenuItem = (props) => {
    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");

    return (
        <>
            {
                props.roles.some(x => props.accessRoles.includes(x)) &&
                <MenuItem active={splitLocation[1] === props.location}
                routerLink={<NavLink to={'/' + props.location}/>}>{props.name}</MenuItem>
            }
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        roles: state.authReducer.roles,
        location: props.location,
        accessRoles: props.accessRoles
    };
}


export default connect(mapStateToProps)(SidebarMenuItem);

