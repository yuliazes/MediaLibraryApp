// src/components/BookDetails.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to access the book ID from the URL

const BookDetails = () => {
    const { id } = useParams(); // Retrieve the book ID from the URL
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate for redirecting to the edit page

    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const response = await api.get(`/books/${id}`); // Ensure this matches the backend route
            setBook(response.data);
        } catch (err) {
            console.error('Error fetching book details:', err);
            setError('Failed to load book details');
        }
    };

    const handleEditClick = () => {
        navigate(`/books/${id}/edit`); // Redirect to edit page for this book
    };

    if (error) return <div>{error}</div>;
    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Release Date: {book.releaseDate}</p>
            <p>Status: {book.status}</p>
            <p>Rating: {book.rating}</p>
            <button onClick={handleEditClick}>Edit</button> {/* Button to edit the book */}
        </div>
    );
};

export default BookDetails;
