import React, { useState } from 'react';
import MovieModal from './MovieModal';


const MovieList = ({ movies }) => {
  const [selectedMovie,setSelectedMovie] = useState(null);
  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
  }
  const handleCloseModal =() =>{
    setSelectedMovie(null);
  }


  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card" onClick={()=>handleOpenModal(movie)}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <h3>{movie.title}</h3>
          <p>Puntuación: {movie.vote_average}</p>
          {/* Puedes agregar más información de la película aquí */}
        </div>
      ))}
      {selectedMovie && <MovieModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={handleCloseModal}/>}
    </div>
  );
};

export default MovieList;