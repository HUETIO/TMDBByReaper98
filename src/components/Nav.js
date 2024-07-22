import React from "react";
import SearchArea from "./SearchArea";

const Nav = ({ SearchArea }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">

                <h4 className="banner"> ABC || TMDB </h4>
                <div className="search-bar">
                {SearchArea}

                </div>
            </div>
        </nav>
    );
};

export default Nav;