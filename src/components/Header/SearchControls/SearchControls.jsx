import { ArtContext } from "../../../contexts/ArtContext";
import { useContext } from "react";

import DropDown from "./DropDown";
import SortOptions from "./SortOptions";
import SearchInput from "./SearchInput";

const SearchControls = () => {
    const artContext = useContext(ArtContext);

    const materials = artContext.materials;
    const techniques = artContext.techniques;

    return (
        <div className="options-container">
            <div className="search-controls-container">
                <SearchInput/>
                <div className="dropdowns-container">
                    <DropDown
                        options={materials}
                        title={"material"}
                        setChoice={artContext.setMaterial}
                    />
                    <DropDown
                        options={techniques}
                        title={"technique"}
                        setChoice={artContext.setTechnique}
                    />
                </div>
            </div>
            <SortOptions />
        </div>
    );
};

export default SearchControls;
