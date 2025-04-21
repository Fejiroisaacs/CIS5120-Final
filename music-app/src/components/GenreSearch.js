import "./GenreSearch.css"

const GenreFolder = ({genre, setGenre}) => {
    const handleClick = () => {
      setGenre(genre);
    }
  
    return (
      <div className="genre" onClick={handleClick}>
        {genre}
      </div>
    )
  }

export const GenreSelect = ({genres, setGenre}) => {
    return (
      <div className="genre-search">
        <div className="genre-header">Search for Records</div>
        <div className="genres">
        {genres.map((g) => <GenreFolder genre={g} setGenre={setGenre}/>)}
      </div>
      </div>
    )
  }