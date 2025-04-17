import React from "react";
import "./BaseLayout.css";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, Link, Outlet } from "react-router-dom";

const BaseLayout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="top-icons">
          <Link to="/" className="icon-link">
            <IconButton className={`icon-button ${location.pathname === '/' ? 'active' : ''}`}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/search" className="icon-link">
            <IconButton className={`icon-button ${location.pathname === '/search' ? 'active' : ''}`}>
              <SearchIcon />
            </IconButton>
          </Link>
          <Link to="/groups" className="icon-link">
            <IconButton className={`icon-button ${location.pathname === '/groups' ? 'active' : ''}`}>
              <GroupsIcon />
            </IconButton>
          </Link>
          <Link to="/music" className="icon-link">
            <IconButton className={`icon-button ${location.pathname === '/music' ? 'active' : ''}`}>
              <MusicNoteIcon />
            </IconButton>
          </Link>
        </div>

        <div className="bottom-icons">
          <Link to="/create" className="icon-link">
            <IconButton className={`icon-button ${location.pathname === '/create' ? 'active' : ''}`}>
              <AddIcon />
            </IconButton>
          </Link>
          <Link to="/account" className="icon-link">
            <IconButton className={`icon-button ${location.pathname === '/account' ? 'active' : ''}`}>
              <PersonOutlineIcon />
            </IconButton>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;