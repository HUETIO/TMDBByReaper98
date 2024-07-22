import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Nav from './Nav';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import './App.css';
import slider from 'react-slick/lib/slider';

const App = () => {
  
  //declaracion de variables
  const apiKey = process.env.REACT_APP_API;
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalPages,setTotalPages]=useState(1);
  const [currentPage, setCurrentPage] =useState(1);
  const [sliderImages,setSliderImages] = useState([]);
  const [value,setValue] =useState(0);

  useEffect(() =>{
const shuffleArray =(array) =>{
  for(let i=array.length -1; i> 0; i--){
    const j= Math.floor(Math.random()*(i+1));
    [array[i],array[j]] =[array[j], array[i]];
  }
  return array;
};

if(movies.length>0){
  const shuffleMovies = shuffleArray([...movies]);
  setSliderImages(shuffleMovies.slice(0,5));
}

  },[movies]);


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
     
     <nav SearchArea={<SearchArea handleSubmit={handleSubmit}handleChange={handleChange}/>}/>
      <h1> ↓ TMDB Bienvenid@s ↓ </h1>
      <SearchArea handleSubmit={handleSubmit} handleChange={handleChange} />


      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrev}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>Siguiente</button>
      </div>
      <MovieList movies={movies.slice((currentPage - 1) * 10, currentPage * 10)} />

      
      <MovieList movies={movies} />

      <h2>slider de imagenes de peliculas</h2>
      <div className='slider-container'>
        <div className='slider'>
          <p>valor:{value}</p>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={sliderImages.length - 1}
           />
        </div>
        {sliderImages.length > 0&& (
          <img
          src={`https://image.tmdb.org/t/p/w500${sliderImages[value].poster_path}`}
            alt='alider'
            className='slider-image' 
          />
        )}
      </div>


      
      <h6> → Prueba echa por Diego Sepulveda H. By Reaper98 </h6>
    </div>
  );
};

export default App;
