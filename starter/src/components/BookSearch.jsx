import React, { useEffect, useState } from "react";
import { search } from "../BooksAPI";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";

const BookSearch = () => {
    const MAX_QUERY_RESULT = 20;

    const [searchingBooks, setSearchingBooks] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const searchByQuery = async () => {
            if (!query || query.trim() === "") {
                setSearchingBooks([]);
                return;
            }

            const res = await search(query, MAX_QUERY_RESULT);
            if (res.length > 0) {
                setSearchingBooks(res.filter(book => book.imageLinks?.thumbnail != null && book.authors?.length > 0));
            }
        };

        searchByQuery();
    }, [query]);

    const queryHandler = (e) => {
        setQuery(e.target.value);
    };

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
                                <BookItem book={book} />
                            </li>
                        ))}
                </ol>
            </div>
        </div>
    );
};

export default BookSearch;
