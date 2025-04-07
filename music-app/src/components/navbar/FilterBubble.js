import React, { useContext } from "react";
import "./FilterBubble.css";
import { FilterContext } from "../../pages/SearchPage";

const FilterBubble = ({ include, dropdown, name }) => {
  const ctxt = useContext(FilterContext)

  const handleClick = () => {
    ctxt.setFilters(prev => ({
      ...prev,
      [dropdown]: {
        ...prev[dropdown],
        [name]: "off"
      }
    }));
  }

  return (
    <div className={"filter-bubble " + (include ? "include" : "exclude") + "-bubble"} onClick={handleClick}>
        {include ? "+" : "-"}{name}
    </div>
  );
};

export default FilterBubble;
