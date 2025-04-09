import React, { useCallback, useContext } from "react";
import "./NavBar.css";
import Dropdown from "./Dropdown";
import { Typography } from "@mui/material";
import { baseContext, FilterContext } from "../../pages/SearchPage";
import FilterBubble from "./FilterBubble";

const NavBar = ({ genres, instruments }) => {
    const ctxt = useContext(FilterContext);

    const handleClearClick = () => {
      ctxt.setFilters(baseContext);
    }

    const Bubbles = useCallback(() => {
        return (<div className="active-filters-container">
            {Object.entries(ctxt.filters).map(([dropdown, items]) => (
              Object.entries(items).map(([name, status]) => {
                if (status === "off") return null;
                
                return (
                  <FilterBubble
                    key={`${dropdown}-${name}`}
                    dropdown={dropdown}
                    name={name}
                    include={status === "include"}
                  />
                );
              })
            ))}
          </div>)
    }, [ctxt.filters])

    return <div className="top-bar">
        <div className="navbar-content">
            <Typography
                fontFamily={"Montserrat, sans-serif"}
                fontSize={"36px"}
            >SEARCH PROJECTS</Typography>
            <Dropdown name="Genre" entries={genres}></Dropdown>
            <Dropdown name="Instruments" entries={instruments}></Dropdown>
            <Bubbles />
            <span className='clear-all-button'>
            <Typography
                fontFamily={"Montserrat, sans-serif"}
                fontSize={"20px"}
                onClick={handleClearClick}
            >Clear All</Typography>
            </span>
        </div>
    </div>
}

export default NavBar;