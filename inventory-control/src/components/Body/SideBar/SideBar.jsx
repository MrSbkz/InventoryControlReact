import React from 'react';
import {Menu, ProSidebarProvider, Sidebar} from "react-pro-sidebar";
import {Button} from "@mui/material";
import SidebarMenuItem from "../../Common/SidebarMenuItem";
import Switcher from "../../Common/Switcher";

const SideBar = (props) => {
    return (
        <ProSidebarProvider>
            <Sidebar
                rootStyles={{
                    color: "black",
                    fontWeight: "bold"
                }}
            >
                <Switcher
                    setItem={props.changeLanguage}
                    items={props.languages}
                    currentItem={props.currentLanguage}
                />
                <hr/>
                <Menu>
                    <SidebarMenuItem
                        name={props.localization.profile}
                        location='profile'
                        accessRoles={['admin','accountant','employee']}
                    />
                    <SidebarMenuItem
                        name={props.localization.usersControl}
                        location='users'
                        accessRoles={['admin']}
                    />
                    <SidebarMenuItem
                        name={props.localization.devices}
                        location='devices'
                        accessRoles={['accountant']}
                    />
                </Menu>
                <hr/>
                <div
                    className="d-flex justify-content-center">
                    <Button
                        size="small"
                        className="mb-3"
                        variant="outlined"
                        color="error"
                        onClick={() => props.logout()}>{props.localization.logout}</Button>
                </div>
            </Sidebar>
        </ProSidebarProvider>
    )
}

export default SideBar;