import { useContext } from "react";
import { ArtContext } from "../../contexts/ArtContext";

import arrowRight from "../../assets/arrow-right.png";
import arrowLeft from "../../assets/arrow-left.png";
import arrowRightDisabled from "../../assets/arrow-right-disabled.png";
import arrowLeftDisabled from "../../assets/arrow-left-disabled.png";

const PageNavigator = () => {
    const artContext = useContext(ArtContext);
    const currentPage = artContext.page;

    const nextPage = artContext.nextPage;
    const previousPage = artContext.previousPage;
    const count = artContext.count;
    const total = artContext.total;
    const amountPerPage = artContext.amountPerPage;

    return (
        <div className="page-navigator-container">
            <div className="page-navigator">
                <span className="current-page">page {currentPage}</span>
                {currentPage == 1 ? (
                    <img
                        src={arrowLeftDisabled}
                        className="page-arrow disabled"
                    />
                ) : (
                    <img
                        src={arrowLeft}
                        onClick={previousPage}
                        className="page-arrow"
                    />
                )}
                {count > amountPerPage * currentPage ? (
                    <img
                        src={arrowRight}
                        onClick={nextPage}
                        className="page-arrow"
                    />
                ) : (
                    <img
                        src={arrowRightDisabled}
                        className="page-arrow disabled"
                    />
                )}
            </div>
            <div className="results-count">
                <b>{count}</b> of <b>{total}</b> results
            </div>
        </div>
    );
};

export default PageNavigator;
