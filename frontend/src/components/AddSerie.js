// src/components/AddSerie.js
import React, { useState } from 'react';
import api from '../services/api';

const AddSerie = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [status, setStatus] = useState('To Watch');
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
            });
            setMessage('Serie added successfully!');
            setTitle('');
            setReleaseDate('');
            setStatus('To Read');
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
                <button type="submit">Add Serie</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddSerie;