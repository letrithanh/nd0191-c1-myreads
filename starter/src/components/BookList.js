import React, {useEffect, useState} from "react";
import Bookshelf from "./Bookshelf";
import { getAll } from "../BooksAPI";
import { Link } from "react-router-dom";
import { CURRENTLY_READIND, READ, WANT_TO_READ } from "../BookType";

const BookList = () => {

    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);

    useEffect(() => {
        fetchAll();
    }, []);

    async function fetchAll() {
        const res = await getAll();
        setCurrentlyReading(res.filter(book => book.shelf === CURRENTLY_READIND));
        setWantToRead(res.filter(book => book.shelf === WANT_TO_READ));
        setRead(res.filter(book => book.shelf === READ));
    }

    function onBookItemUpdate() {
        fetchAll();
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf title="Currently Reading" books={currentlyReading} onBookItemUpdate={onBookItemUpdate} />
                    <Bookshelf title="Want to Read" books={wantToRead} onBookItemUpdate={onBookItemUpdate} />
                    <Bookshelf title="Read" books={read} onBookItemUpdate={onBookItemUpdate} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    );
};

export default BookList;
