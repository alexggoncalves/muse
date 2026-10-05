import "./searchControls.css";

import { ArtContext } from "../../../contexts/ArtContext";
import { useContext, useEffect, useRef } from "react";

import searchIcon from "../../../assets/search-icon.png";

const SearchInput = () => {
    const searchInputRef = useRef();
    const artContext = useContext(ArtContext);
    const setSearchInput = artContext.setSearchInput;

    const updateInput = () => {
        if (searchInputRef.current) {
            setSearchInput(searchInputRef.current.value);
        }
    };

    const handleEmptyInput = (event) => {
        if(event.target.value == "") updateInput()
    };

    useEffect(() => {
        const handleEnterPress = (event) => {
            if (event.key == "Enter") {
                updateInput()
            }
        };
        if (searchInputRef.current) {
            searchInputRef.current.addEventListener(
                "keypress",
                handleEnterPress
            );
        }

        return () => {
            if (searchInputRef.current) {
                searchInputRef.current.removeEventListener(
                    "keypress",
                    handleEnterPress
                );
            }
        };
    }, [searchInputRef.current]);

    return (
        <div>
            <p className="search-controls-title">search</p>
            <input
                ref={searchInputRef}
                className="search-bar"
                placeholder="..."
                onChange={handleEmptyInput}
            ></input>
            <img
                src={searchIcon}
                alt="search-icon"
                className="search-icon"
                onClick={updateInput}
            />
        </div>
    );
};

export default SearchInput;
