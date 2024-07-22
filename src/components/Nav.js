import React from "react";
import SearchArea from "./SearchArea";

const Nav = ({ SearchArea }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">

                <h4 className="banner"> TMDB || By Reaper98 </h4>
                <div className="search-bar">
                {SearchArea}

                </div>
            </div>
        </nav>
    );
};

export default Nav;