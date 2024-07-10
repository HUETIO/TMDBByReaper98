import { render } from '@testing-library/react';
import './App.css';
import Nav from './Nav'
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import { Component } from 'react';

class App extends Component{
  constructor (){
    super()
    this.state = {
      movies:[],
      searchTerm: ''
    }
    this.apiKey = process.env.REACT_APP_API
  }

  handleSubmit =(e) =>{
    e.preventDefault();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
    .then (data => data.json())
    .then (data => {
      console.log(data);
      this.setState({movies:[...data.results]})
    })
  }

  handleChange =(e)=>{
    this.setState({searchTerm: e.target.value})

  }

render (){
  return (
    <div className="App">
      <h1> ↓ Hola Bienvenid@s ↓ </h1>
      <Nav/>
      <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
      <MovieList movies = {this.state.movies}/>
      <h6> → Prueba echa por Diego Sepulveda H. By Reaper98 </h6>
      
    </div>
  )
}

}




export default App;
