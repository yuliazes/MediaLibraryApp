import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import AddBook from './AddBook';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if no token
            navigate('/login');
            return;
        }

        // Fetch books from API
        api.get('/books')
            .then((response) => {
                console.log('API response:', response.data); // Log the response here
                setBooks(response.data.books);
            })
            .catch((err) => {
                console.error('Error fetching books:', err);
                setError('Failed to load books');
            });
    }, [navigate]);

    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Media Library - Books</h1>
            <AddBook onAdd={handleAddBook} />
            <ul>
                {books.map((book) => (
                    <li key={book._id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Books;