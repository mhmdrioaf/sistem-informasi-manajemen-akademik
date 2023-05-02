import { IconButton, Stack } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BasicTextField from "../../../components/textfields/BasicTextField";
import { AiOutlineSend } from "react-icons/ai";
import "../User.scss";

function Chat() {
  return (
    <div className="chat">
      <Stack className="container" direction="row">
        <Stack className="sidebar">
          <Stack className="user-container" direction="row">
            <LazyLoadImage
              className="user-image"
              src={"/broken-image.jpg"}
              alt="profile"
            />
            <Stack className="user-message-container">
              <span className="user-name">Rio</span>
              <span className="user-message">Hello!</span>
            </Stack>
          </Stack>
          <Stack className="user-container" direction="row">
            <LazyLoadImage
              className="user-image"
              src={"/broken-image.jpg"}
              alt="profile"
            />
            <Stack className="user-message-container">
              <span className="user-name">Rio</span>
              <span className="user-message">Hello!</span>
            </Stack>
          </Stack>
          <Stack className="user-container" direction="row">
            <LazyLoadImage
              className="user-image"
              src={"/broken-image.jpg"}
              alt="profile"
            />
            <Stack className="user-message-container">
              <span className="user-name">Rio</span>
              <span className="user-message">Hello!</span>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="message-container">
          <Stack className="chat-room">
            <Stack className="chat-user-incoming-message" direction="row">
              <p>hello</p>
            </Stack>
            <Stack className="chat-user-sent-message" direction="row">
              <p>hi brooooooooooooooooooooooooooooooooooooooooooooooooooo</p>
            </Stack>
          </Stack>
          <Stack className="message-input-container" direction="row">
            <BasicTextField placeholder="Ketik pesan disini..." fullWidth />
            <IconButton size="medium" disableRipple>
              <AiOutlineSend />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default Chat;
