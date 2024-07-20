import React, {useState} from 'react'

const MovieModal = ({movie, isOpen, onClose}) =>{
    const [showDetails,setShowDetails] = useState(false);
    const handleClose =() =>{
        setShowDetails(false);
        onClose();
    };
    return (
        <div className={`modal ${isOpen ? 'is-open' : ''} `}>

            <div className='modal-content'>
            <h2 className='modal-title'>
                {movie.title}</h2>
                <button className='close' onClick={handleClose}>x</button>
                
                <div className='modal-body'>
                    <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className='movie-poster'
                    />
                    
                    {showDetails ? (
                    <div>
                        <p>Descripcion:{movie.overview}</p>
                        <p>Fecha de Lanzamiento: {movie.release_date}</p>

                    </div>

                    ):(
                        <button onClick={()=>
                            setShowDetails(true)}> ver detalles</button>

                    )}

                </div>

            </div>        

        </div>

    );
};

export default MovieModal;