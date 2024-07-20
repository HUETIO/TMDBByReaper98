import React from "react";

const SearchArea = (props) => {
 return (
    <form onSubmit={props.handleSubmit}>
        <div className="input-field">
            <input
            placeholder="Ingresa el nombre de tu pelicula aqui"
            type="text"
            onChange={props.handleChange}
            />
            <button type="submit">Buscar</button>

        </div>

    </form>
 );
};

export default SearchArea;