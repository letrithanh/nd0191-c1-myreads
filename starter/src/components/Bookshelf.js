import React from "react";
import BookItem from "./BookItem";

const Bookshelf = ({ title, books, onBookItemUpdate }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <BookItem book={book} onBookItemUpdate={onBookItemUpdate} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Bookshelf;
