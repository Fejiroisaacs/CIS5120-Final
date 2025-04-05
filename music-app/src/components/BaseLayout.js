import React from "react";
import "./BaseLayout.css";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const BaseLayout = ({ children }) => {
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="top-icons">
          <IconButton className="icon-button">
            <HomeIcon />
          </IconButton>
          <IconButton className="icon-button active">
            <SearchIcon />
          </IconButton>
          <IconButton className="icon-button">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton className="icon-button">
            <MusicNoteIcon />
          </IconButton>
        </div>

        <div className="bottom-icons">
          <IconButton className="icon-button">
            <AddIcon />
          </IconButton>
          <IconButton className="icon-button">
            <PersonOutlineIcon />
          </IconButton>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar" />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;
