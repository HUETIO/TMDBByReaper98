import React from "react";
import SearchArea from "./SearchArea";

const Nav = ({ SearchArea }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">

                <h1 className="banner"> TMDB </h1>
                {SearchArea}
            </div>
        </nav>
    );
};

export default Nav;