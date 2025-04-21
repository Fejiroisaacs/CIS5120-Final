import "./RecordSearch.css";
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProjectCard from "./ProjectCard";
import { useState } from "react";

export const SearchResults = ({ genre, setGenre, data }) => {
  const [expandedTitle, setExpandedTitle] = useState(null);

  return (
    <>
      <div className="search-header">
        <div className="folder-tab">
          {genre}
        </div>
        <span className='clear-all-button' onClick={() => { setGenre(null) }}>
          <CloseIcon />
          <Typography
            fontFamily={"Montserrat, sans-serif"}
            fontSize={"20px"}
          >Return</Typography>
        </span>
      </div>
      <div className="search-results">
        {data.map((project, index) => (
          <div key={index} className={`result ${expandedTitle !== null ? "expand" : ""}`}>
            <ProjectCard
              key={index}
              title={project.title}
              members={project.members}
              genres={project.genres}
              instrumens={project.instruments}
              image={project.image}
              runtime={project.runtime}
              creationDate={project.creationDate}
              isExpanded={expandedTitle === project.title}
              onExpand={() => setExpandedTitle(project.title)}
              onCollapse={() => setExpandedTitle(null)}
              blurred={expandedTitle !== null && expandedTitle !== project.title}
              search={true}
              audioFile={project.audioFile}
            /></div>
        ))}
      </div>
    </>
  );
}