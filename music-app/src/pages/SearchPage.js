import React, { useState } from 'react';
import musicProjects from "../data/musicProjects.json";
import { GenreSelect } from '../components/GenreSearch';
import { SearchResults } from '../components/RecordSearch';

const genres = ["Rock", "Pop", "Country", "Indie", "Alternative", "R&B", "Electronica"];

const SearchPage = () => {
  const [genre, setGenre] = useState(null)

  return (
    <>{genre !== null
      ? <SearchResults
        genre={genre}
        setGenre={setGenre}
        data={musicProjects}
      />
      : <GenreSelect
        genres={genres}
        setGenre={setGenre}
      />}</>
  );
};

export default SearchPage;
