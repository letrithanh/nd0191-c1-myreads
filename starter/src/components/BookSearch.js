import React, { useEffect, useState } from "react";
import { getAll, search } from "../BooksAPI";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import { CURRENTLY_READIND, WANT_TO_READ, READ, NONE } from "../BookType";

const BookSearch = () => {
    const MAX_QUERY_RESULT = 20;

    const [searchingBooks, setSearchingBooks] = useState([]);
    const [query, setQuery] = useState("");
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);

    useEffect(() => {
        const searchByQuery = async () => {
            if (!query || query.trim() === "") {
                setSearchingBooks([]);
                return;
            }

            const res = await search(query, MAX_QUERY_RESULT);
            if (res.length > 0) {
                setSearchingBooks(
                    res.filter(
                        (book) =>
                            book.imageLinks?.thumbnail != null &&
                            book.authors?.length > 0
                    )
                );
            }

            const fetchBooks = await getAll();
            setCurrentlyReading(
                fetchBooks.filter((book) => book.shelf === CURRENTLY_READIND)
            );
            setWantToRead(fetchBooks.filter((book) => book.shelf === WANT_TO_READ));
            setRead(fetchBooks.filter((book) => book.shelf === READ));
        };

        searchByQuery();
    }, [query]);

    const queryHandler = (e) => {
        setQuery(e.target.value);
    };

    function getPreSelectValue(book) {
        let foundBook = currentlyReading.filter(each => each.id === book.id);
        if (foundBook.length > 0) {
            return CURRENTLY_READIND;
        }

        foundBook = wantToRead.filter(each => each.id === book.id);
        if (foundBook.length > 0) {
            return WANT_TO_READ;
        }

        foundBook = read.filter(each => each.id === book.id);
        if (foundBook.length > 0) {
            return READ;
        }

        return NONE;
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={queryHandler}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchingBooks.length > 0 &&
                        searchingBooks.map((book) => (
                            <li key={book.id}>
                                <BookItem book={book} preSelectCategory={getPreSelectValue(book)} />
                            </li>
                        ))}
                </ol>
            </div>
        </div>
    );
};

export default BookSearch;
