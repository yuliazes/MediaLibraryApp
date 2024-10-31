// src/components/AddMovie.js
import React, { useState } from 'react';
import api from '../services/api';

const AddMovie = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [status, setStatus] = useState('Wishlist');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleAddMovie = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/movies/add', {
                title,
                releaseDate,
                status,
                rating,
                category
            });
            setMessage('Movie added successfully!');
            setTitle('');
            setReleaseDate('');
            setStatus('Wishlist');
            setCategory('');
            setRating(0);

            // Call onAdd to update the list in the parent component
            if (onAdd) onAdd(response.data);
        } catch (error) {
            console.error('Error adding movie:', error);
            setMessage('Failed to add movie.');
        }
    };

    return (
        <div>
            <h2>Add a New Movie</h2>
            <form onSubmit={handleAddMovie}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Release Date:</label>
                    <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Wishlist">Wishlist</option>
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="0" max="5" />
                </div>
                <div>
    <label>Category:</label>
    <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    >
        <option value="">Select Category</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Romance">Romance</option>
        <option value="Thriller">Thriller</option>
        <option value="Mystery">Mystery</option>
        <option value="Documentary">Documentary</option>
        <option value="Animation">Animation</option>
        <option value="Adventure">Adventure</option>
    </select>
</div>
                <button type="submit">Add Movie</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddMovie;