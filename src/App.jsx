import "./App.css";

import ArtList from "./components/ArtList/ArtList";
import { ArtProvider } from "./contexts/ArtContext";
import Header from "./components/Header/Header";

function App() {
    return (
        <ArtProvider>
            <header>    
                <Header></Header>
            </header>
            <main>
                <ArtList />
            </main>
        </ArtProvider>
    );
}

export default App;
