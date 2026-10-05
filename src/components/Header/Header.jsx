import "./header.css";

import About from "./About";
import PageNavigator from "./PageNavigator";
import SearchControls from "./SearchControls/SearchControls";


const Header = () => {
    return (
        <>
            <div className="main-header">
                <span className="logo">MUSE</span>
                <About />
            </div>

            <SearchControls></SearchControls>
            <PageNavigator />
        </>
    );
};

export default Header;
