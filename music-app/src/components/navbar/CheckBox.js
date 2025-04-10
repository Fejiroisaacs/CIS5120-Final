import React, { useContext } from "react";
import "./CheckBox.css";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import { FilterContext } from "../../pages/SearchPage";

const CheckBox = ({ dropdown, name }) => {
  const ctxt = useContext(FilterContext);

  const handleClick = (status) => {
    ctxt.setFilters(prev => ({
      ...prev,
      [dropdown]: {
        ...prev[dropdown],
        [name]: status === ctxt.filters[dropdown][name] ? "off" : status
      }
    }));
  }

  return (
    <div className="checkbox">
      <div className="content">
        <Typography fontFamily={"Montserrat"} fontWeight={"medium"} fontSize={"1.4vw"}>{name}</Typography>
        <span className="boxes">
          <div
            className={`${ctxt.filters[dropdown][name] === "exclude" ? "exclude-active" : "exclude"} box`}
            onClick={() => {handleClick("exclude")}}
          >
            <CloseIcon
              htmlColor={ctxt.filters[dropdown][name] === "exclude" ? "#813333" : "#A26D6D"}
              fontSize='large'
            />
          </div>
          <div
            className={`${ctxt.filters[dropdown][name] === "include" ? "include-active" : "include"} box`}
            onClick={() => {handleClick("include")}}
          >
            <AddIcon
              htmlColor={ctxt.filters[dropdown][name] === "include" ? "#205E42" : "#6DA28A"}
              fontSize='large'
            />
          </div>
        </span>
      </div>
    </div>
  );
};

export default CheckBox;
