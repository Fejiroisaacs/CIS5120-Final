import "./RecordSearch.css";
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProjectCard from "./ProjectCard";

export const SearchResults = ({ genre, setGenre, data }) => {
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
            <div className="result">
              <ProjectCard
                key={index}
                title={project.title}
                members={project.members}
                genres={project.genres}
                instrumens={project.instruments}
                image={project.image}
                runtime={project.runtime}
                creationDate={project.creationDate}
                search={true}
                audioFile={project.audioFile}
              /></div>
          ))}
        </div>
      </>
    );
  }