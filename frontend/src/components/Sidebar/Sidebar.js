import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import SidebarOption from "../SidebarOption/SidebarOption";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useStateValue } from "../../StateProvider";
import axios from "../../axios";
import Pusher from "pusher-js";

const pusher = new Pusher("8b6f19dae067397fb369", {
  cluster: "us2",
});

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();

  const getChannelList = () => {
    axios.get("/get/channelList").then((res) => {
      setChannels(res.data);
    });
  };

  useEffect(() => {
    getChannelList();

    // real time stuff...
    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannelList();
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>DevTeam KwonPark</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="To do" />
      <SidebarOption Icon={PeopleAltIcon} title="Team members" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {/* Connect to dB and list all the channels */}
      {/* <SidebarOption ... /> */}
      {channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}
    </div>
  );
}

export default Sidebar;
