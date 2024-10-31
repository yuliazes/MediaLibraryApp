import React, { useState } from 'react';
import api from '../services/api';

const AddBook = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [rating, setRating] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleAddBook = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/books/add', {
                title,
                author,
                releaseDate,
                rating,
                status,
                category
            });

            setTitle('');
            setAuthor('');
            setReleaseDate('');
            setRating('');
            setStatus('');
            setCategory('');
            setMessage('Book added successfully!');
            onAdd(response.data);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to add book. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleAddBook}>
                <label>Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
                <label>Author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required /></label>
                <label>Release Date: <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} /></label>
                <label>Rating: <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} /></label>
                <label>Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="Wishlist">Wishlist</option>
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Mystery">Mystery</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Romance">Romance</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="Thriller">Thriller</option>
        <option value="Biography">Biography</option>
        <option value="Self-Help">Self-Help</option>
        <option value="Young Adult">Young Adult</option>
        <option value="Children’s">Children’s</option>
        <option value="Horror">Horror</option>
        <option value="Classic">Classic</option>
        <option value="Poetry">Poetry</option>
                        {/* Add all other categories here */}
                    </select>
                </label>
                <button type="submit">Add Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddBook;