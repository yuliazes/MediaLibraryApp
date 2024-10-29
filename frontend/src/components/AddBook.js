// src/components/AddBook.js
import React, { useState } from 'react';
import api from '../services/api';

const AddBook = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [status, setStatus] = useState('To Read');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/books/add', {
                title,
                author,
                releaseDate,
                status,
                rating,
            });
            setMessage('Book added successfully!');
            setTitle('');
            setAuthor('');
            setReleaseDate('');
            setStatus('To Read');
            setRating(0);

            // Call onAdd to update the list in the parent component
            if (onAdd) onAdd(response.data);
        } catch (error) {
            console.error('Error adding book:', error);
            setMessage('Failed to add book.');
        }
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleAddBook}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div>
                    <label>Release Date:</label>
                    <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Wishlist">Wishlist</option>
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="0" max="5" />
                </div>
                <button type="submit">Add Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddBook;