import "./artList.css";

import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ArtContext } from "../../contexts/ArtContext";
import Loading from "./Loading";
import ArtCard from "./ArtCard";

import PageNavigator from "../Header/PageNavigator";
import NoResults from "./NoResults";

const ArtList = () => {
    const artContext = useContext(ArtContext);
    const resultList = artContext.art;
    const count = artContext.count;
    const loading = artContext.loading;

    return (
        <div className="art-list-container">
            <div className="art-list">
                {loading ? <Loading /> : undefined}
                {!loading && count == 0 ? <NoResults /> : undefined}
                {resultList?.map((art) => (
                    <ArtCard key={uuidv4()} art={art} />
                ))}
            </div>
        </div>
    );
};

export default ArtList;
