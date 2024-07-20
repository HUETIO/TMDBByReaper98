import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Nav from './Nav';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import './App.css';

const App = () => {
  const apiKey = process.env.REACT_APP_API;

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`);
    const data = await response.json();

    // Obtén el total de páginas de la API (debes ver cómo se estructura la respuesta para encontrar el valor correcto)
    const totalPages = data.total_pages || 1; // Valor por defecto 1 si no se encuentra

    setMovies([...data.results]);
    setTotalPages(totalPages);
    setCurrentPage(1); // Empieza en la página 1
  };

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [value, setValue] = useState(0);
  const images = [
    'https://source.unsplash.com/1600x900/?nature,water',
    'https://source.unsplash.com/1600x900/?nature,trees',
    'https://source.unsplash.com/1600x900/?nature,mountains'
  ];

  return (
    <div className="App">
      <h1 className='banner'> prueba de estilos con el banner</h1>
      <h1> ↓ TMDB Bienvenid@s ↓ </h1>
      <SearchArea handleSubmit={handleSubmit} handleChange={handleChange} />


      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrev}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>Siguiente</button>
      </div>
      <MovieList movies={movies.slice((currentPage - 1) * 10, currentPage * 10)} />

      
      <MovieList movies={movies} />

      <h1>slider prueba de css styles</h1>
      <div className="slider-container">
        <div className="slider">
          <p>Valor: {value}</p>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={images.length - 1}
          />
        </div>
        <img src={images[value]} alt="Slider" className="slider-image" />
      </div>

      <h6> → Prueba echa por Diego Sepulveda H. By Reaper98 </h6>
    </div>
  );
};

export default App;
