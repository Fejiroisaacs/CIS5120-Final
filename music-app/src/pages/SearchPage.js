import React, { createContext, useState } from 'react';
import "../components/Style.css";
import ProjectCard from "../components/ProjectCard";
import NavBar from '../components/navbar/NavBar';

const genres = ["Rock", "Pop", "Country", "Indie", "Alternative"];
const instruments = ["Vocals", "Guitar", "Piano", "Bass", "Drums"];

const baseContext = {
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

const SearchResults = () => {
  return (<div className="search-results">
    <ProjectCard
      title="DISCO PRINCE"
      members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
      tags={["Pop", "Indie"]}
    />
    <ProjectCard
      title="DISCO PRINCE"
      members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
      tags={["Pop", "Indie"]}
    />
    <ProjectCard
      title="DISCO PRINCE"
      members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
      tags={["Pop", "Indie"]}
    />
    <ProjectCard
      title="DISCO PRINCE"
      members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
      tags={["Pop", "Indie"]}
    />
    <ProjectCard
      title="DISCO PRINCE"
      members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
      tags={["Pop", "Indie"]}
    />
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
      <SearchResults />
    </FilterContext.Provider>
  );
};

export default SearchPage;
