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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setMovies([...data.results]);
      });
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
      <h1> ↓ Hola Bienvenid@s ↓ </h1>
      <Nav />
      <SearchArea handleSubmit={handleSubmit} handleChange={handleChange} />
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
