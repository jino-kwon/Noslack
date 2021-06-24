import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { StarBorderOutlined, InfoOutlined } from "@material-ui/icons";
import Message from "../Message/Message";
import ChatInput from "../ChatInput/ChatInput";
import axios from "../../axios";
import Pusher from "pusher-js";

const pusher = new Pusher("8b6f19dae067397fb369", {
  cluster: "us2",
});

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  const getConvo = () => {
    axios.get(`/get/conversation?id=${roomId}`).then((res) => {
      setRoomDetails(res.data[0].channelName);
      setRoomMessages(res.data[0].conversation);
    });
  };

  useEffect(() => {
    if (roomId) {
      getConvo();

      // real time stuff
      const channel = pusher.subscribe("conversation");
      channel.bind("newMessage", function (data) {
        getConvo();
      });
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails} channelId={roomId} />
    </div>
  );
}

export default Chat;
