import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
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
    </div>
  );
};

export default MovieList;