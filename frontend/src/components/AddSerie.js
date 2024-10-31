// src/components/AddSerie.js
import React, { useState } from 'react';
import api from '../services/api';

const AddSerie = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [status, setStatus] = useState('Wishlist');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleAddSerie = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/series/add', {
                title,
                releaseDate,
                status,
                rating,
                category
            });
            setMessage('Serie added successfully!');
            setTitle('');
            setReleaseDate('');
            setStatus('Wishlist');
            setCategory('');
            setRating(0);

            // Call onAdd to update the list in the parent component
            if (onAdd) onAdd(response.data);
        } catch (error) {
            console.error('Error adding serie:', error);
            setMessage('Failed to add serie.');
        }
    };

    return (
        <div>
            <h2>Add a New Serie</h2>
            <form onSubmit={handleAddSerie}>
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
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="science-fiction">Science Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="romance">Romance</option>
        <option value="thriller">Thriller</option>
        <option value="mystery">Mystery</option>
        <option value="documentary">Documentary</option>
        <option value="animation">Animation</option>
        <option value="adventure">Adventure</option>
    </select>
</div>
                <button type="submit">Add Serie</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddSerie;