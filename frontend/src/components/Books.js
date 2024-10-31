import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import AddBook from './AddBook';
import './Books.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        api.get('/books')
            .then((response) => {
                setBooks(response.data.books || []);
            })
            .catch(() => {
                setError('Failed to load books');
            });
    }, [navigate]);

    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="library-container">
            <h1 className="library-title">Books Library</h1>
            <AddBook onAdd={handleAddBook} />
            <div className="books-grid">
                {books.map((book) => (
                    <div className="book-card" key={book._id}>
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">by {book.author}</p>
                        <p className="book-release-date">{new Date(book.releaseDate).toLocaleDateString()}</p>
                        <p className="book-status">Status: {book.status}</p>
                        <p className="book-rating">Rating: {book.rating}</p>
                        <Link to={`/books/${book._id}`} className="details-link">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;