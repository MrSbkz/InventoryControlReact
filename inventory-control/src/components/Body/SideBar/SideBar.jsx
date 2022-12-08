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
                        name={props.localization.usersControl}
                        location='users'
                        accessRoles={['admin']}
                    />
                    <SidebarMenuItem
                        name={props.localization.requests}
                        location='requests'
                        accessRoles={['admin']}
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