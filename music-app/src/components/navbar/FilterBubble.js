import React from "react";
import "./FilterBubble.css";

const FilterBubble = ({ include, name }) => {
  return (
    <div className={"filter-bubble " + (include ? "include" : "exclude")}>
        <span>{include ? "+" : "-"}</span>
        <span>{name}</span>
    </div>
  );
};

export default FilterBubble;
