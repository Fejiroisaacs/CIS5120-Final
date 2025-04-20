import React, { useState } from 'react';
import "./PageStyle.css";
import ProjectCard from "../components/ProjectCard";
import musicProjects from "../data/musicProjects.json";

const genres = ["Rock", "Pop", "Country", "Indie", "Alternative", "R&B", "Electronica"];

const GenreFolder = ({genre}) => {
  return (
    <div className="genre">
      {genre}
    </div>
  )
}

const GenreSelect = ({genres}) => {
  return (
    <div className="genres">
      {genres.map((g) => <GenreFolder genre={g} />)}
    </div>
  )
}

const SearchResults = ({genre, data}) => {
  return (
    <div className="search-results">
      {musicProjects.map((project, index) => (
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
  );
}

const SearchPage = () => {
  const [genre, setGenre] = useState(null)

  return (
      <>{genre !== null ? <SearchResults 
        genre={genre}
        data={musicProjects}
      /> : <GenreSelect genres={genres}/>}</>
  );
};

export default SearchPage;
