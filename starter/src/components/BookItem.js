import React from "react";
import { update } from "../BooksAPI";

const BookItem = ({ book, onBookItemUpdate, preSelectCategory }) => {

    async function onSelectChanged(event) {
        await update(book, event.target.value);
        if (onBookItemUpdate) {
            onBookItemUpdate();
        }
    }

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={onSelectChanged} value={preSelectCategory || book.shelf}>
                        <option value="undefine" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
};

export default BookItem;
