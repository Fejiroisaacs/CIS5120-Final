import React, { useState } from "react";
import "./Dropdown.css";
import CheckBox from "./CheckBox";
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Dropdown = ({ name, entries }) => {
  const [opened, setOpened] = useState(false)

  const handleClick = () => {
    setOpened(!opened);
  }

  return (
    <div className="dropdown">
      <div className="header" onClick={handleClick}>
        <Typography
          fontFamily={"Montserrat"}
          fontWeight={600}
          fontSize={"1.4vw"}
        >{name}</Typography>
        {opened
          ? <ExpandLessIcon htmlColor="#BFC6E2" fontSize="large" />
          : <ExpandMoreIcon htmlColor="#BFC6E2" fontSize="large" />}
      </div>
      <div className="entries" style={{ "display": opened ? "block" : "none" }}>
        {entries.map((e) => <CheckBox key={e} dropdown={name} name={e} />)}
      </div>
    </div>
  );
};

export default Dropdown;
