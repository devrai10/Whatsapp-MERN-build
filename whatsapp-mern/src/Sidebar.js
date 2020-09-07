import React from 'react'
import "./Sidebar.css"
import SidebarChat from "./SidebarChat"
import { SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://vignette.wikia.nocookie.net/bleach/images/8/8d/572Kenpachi_profile.png/revision/latest/scale-to-width-down/250?cb=20190331080811&path-prefix=en" />
                <div classNAme="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat"
                        type="text" />
                </div>
            </div>
            <div className="sidebar__chats">

                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}
export default Sidebar;