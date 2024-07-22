import React, { useEffect, useState } from 'react';
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
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sliderImages, setSliderImages] = useState([]);
  const [value, setValue] = useState(0);

  // Función para mezclar un array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Obtener películas populares al montar el componente
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
      const data = await response.json();
      setMovies(data.results);
      const shuffledMovies = shuffleArray([...data.results]);
      setSliderImages(shuffledMovies.slice(0, 16)); // Obtén 16 imágenes aleatorias para el slider
    };

    fetchPopularMovies();
  }, [apiKey]);

  // Cambiar las imágenes del slider automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => (prevValue + 1) % sliderImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [sliderImages, movies]); // Ahora depende de sliderImages y movies

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`);
    const data = await response.json();
    const totalPages = data.total_pages || 1;

    setMovies(data.results);
    setTotalPages(totalPages);
    setCurrentPage(1);
    setValue(0); // Restablece el valor del slider
    const shuffledMovies = shuffleArray([...data.results]);
    setSliderImages(shuffledMovies.slice(0, 16)); // Actualiza sliderImages con 16 resultados aleatorios de la búsqueda
  };

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

  return (
    <div className="App">

      <div>
        <title>By Reaper98 - || TMDB</title>
        <meta name='description' content='encuentra las mejores peliculas del momento. tu fuente de informacion peliculas y series'/>
      </div>
      <Nav SearchArea={<SearchArea handleSubmit={handleSubmit} handleChange={handleChange} />} />
      <h1>↓ TMDB Bienvenid@s ↓</h1>
      
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrev}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>Siguiente</button>
      </div>
      <MovieList movies={movies.slice((currentPage - 1) * 10, currentPage * 10)} />

      <h2>Slider de imágenes de películas</h2>
      <div className="slider-container">
        <div className="slider">
          <p>Valor: {value}</p>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={sliderImages.length - 1}
          />
        </div>
        {sliderImages.length > 0 && (
          <img
            src={`https://image.tmdb.org/t/p/w500${sliderImages[value].poster_path}`}
            alt="Slider"
            className="slider-image"
          />
        )}
      </div>

      <h6>→ Prueba hecha por Diego Sepulveda H. By Reaper98</h6>
    </div>
  );
};

export default App;
