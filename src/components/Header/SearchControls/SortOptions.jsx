import { useContext } from "react";

import { ArtContext } from "../../../contexts/ArtContext";

import clock from "../../../assets/clock-icon.png";
import sortArrow from "../../../assets/sort-arrow.png";

const SortOptions = () => {
    const artContext = useContext(ArtContext);
    const order = artContext.order;
    const setOrder = artContext.setOrder;

    const togglechronologicOrder = () => {
        if (order == "chronologic") setOrder("achronologic");
        else if (order == "achronologic") setOrder("");
        else setOrder("chronologic");
    };

    const toggleAlphabeticalOrder = () => {
        if (order == "artist") setOrder("artistdesc");
        else if (order == "artistdesc") setOrder("");
        else setOrder("artist");
    };

    const toggleRelevanceOrder = () => {
        if (order == "relevance") setOrder("");
        else setOrder("relevance");
    };

    return (
        <div className="sort-container">
            <p className="search-controls-title">sort</p>
            <div className="sort-options">
                <div
                    className={order == "relevance" ? "sort-active" : "sort-innactive"}
                    onClick={toggleRelevanceOrder}
                >
                    relevance
                </div>
                <div
                    className={
                        order == "chronologic" || order == "achronologic"
                            ? "sort-active"
                            : "sort-innactive"
                    }
                    onClick={togglechronologicOrder}
                >
                    <img src={clock} alt="clock" />
                    <img className={order == "achronologic" ? "invert" : undefined} src={sortArrow} alt="arrow" />
                </div>
                <div
                    className={
                        order == "artist" || order == "artistdesc"
                            ? "sort-active"
                            : "sort-innactive"
                    }
                    onClick={toggleAlphabeticalOrder}
                >
                    <span>A-Z</span>
                    <img className={order == "artistdesc" ? "invert" : undefined} src={sortArrow} alt="arrow" />
                </div>
            </div>
        </div>
    );
};

export default SortOptions;
