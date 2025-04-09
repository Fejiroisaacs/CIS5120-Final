import React, { createContext, useState } from 'react';
import "../components/Style.css";
import ProjectCard from "../components/ProjectCard";
import musicProjects from "../data/musicProjects.js";
import NavBar from '../components/navbar/NavBar';

const genres = ["Rock", "Pop", "Country", "Indie", "Alternative"];
const instruments = ["Vocals", "Guitar", "Piano", "Bass", "Drums"];

export const baseContext = {
  "Genre": genres.reduce((acc, genre) => {
    acc[genre] = "off";
    return acc;
  }, {}),
  "Instruments": instruments.reduce((acc, instrument) => {
    acc[instrument] = "off";
    return acc;
  }, {})
};

export const FilterContext = createContext();

const SearchResults = ({filters, data}) => {

  const filterSongs = (songs, filters) => {
    return songs.filter(song => {
      // Check Genre filters (note the capitalization)
      const genreMatch = checkCategory(song.genres, filters.Genre);
      if (!genreMatch) return false;
  
      // Check Instruments filters (note the capitalization and plural vs singular)
      const instrumentMatch = checkCategory(song.instruments, filters.Instruments);
      if (!instrumentMatch) return false;
  
      return true;
    });
  };
  
  const checkCategory = (songItems, filterItems) => {
    const included = [];
    const excluded = [];
  
    // Process filter items
    for (const [name, status] of Object.entries(filterItems)) {
      if (status === "include") included.push(name);
      if (status === "exclude") excluded.push(name);
    }
  
    // Reject if song contains any excluded items
    if (excluded.some(item => songItems.includes(item))) {
      return false;
    }
  
    // If includes exist, song must have at least one
    if (included.length > 0 && !included.some(item => songItems.includes(item))) {
      return false;
    }
  
    return true;
  };
  
  // Usage:
  const musicProjects = filterSongs(data, filters);

  return (<div className="search-results">
      {musicProjects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          members={project.members}
          tags={project.genres}
          image={project.image}
        />))}
  </div>)
}

const SearchPage = () => {
  const [filters, setFilters] = useState(baseContext);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}> 
      <NavBar
        genres={genres}
        instruments={instruments}
      />
      <SearchResults filters={filters} data={musicProjects}/>
    </FilterContext.Provider>
  );
};

export default SearchPage;
