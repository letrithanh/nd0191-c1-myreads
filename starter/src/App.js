import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/search" element={<BookSearch />} />
            </Routes>
        </div>
    );
}

export default App;
