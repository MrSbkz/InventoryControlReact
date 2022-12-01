import React from 'react';
import {Menu, ProSidebarProvider, Sidebar} from "react-pro-sidebar";
import {Button} from "@mui/material";
import SidebarMenuItem from "../../Common/SidebarMenuItem";

const SideBar = (props) => {
    return (
        <ProSidebarProvider>
            <Sidebar>
                <div className="d-flex justify-content-center">
                    <Button size="small" className="mt-3 mb-3" variant="outlined" color="error"
                    onClick={() => props.logout()}>Logout</Button>
                </div>
                <Menu>
                    <SidebarMenuItem 
                        name='Users Control'
                        location='users'
                        role='admin'
                    />
                    <SidebarMenuItem
                        name='Requests'
                        location='requests'
                        role='admin'
                    />
                </Menu>
            </Sidebar>
        </ProSidebarProvider>
    )
}

export default SideBar;