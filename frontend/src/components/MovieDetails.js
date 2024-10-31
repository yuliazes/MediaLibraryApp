// src/components/MovieDetails.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to access the movie ID from the URL

const MovieDetails = () => {
    const { id } = useParams(); // Retrieve the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate for redirecting to the edit page

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await api.get(`/movies/${id}`); // Ensure this matches the backend route
            setMovie(response.data);
        } catch (err) {
            console.error('Error fetching movie details:', err);
            setError('Failed to load movie details');
        }
    };

    const handleEditClick = () => {
        navigate(`/movies/${id}/edit`); // Redirect to edit page for this movie
    };

    if (error) return <div>{error}</div>;
    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Status: {movie.status}</p>
            <p>Rating: {movie.rating}</p>
            <button onClick={handleEditClick}>Edit</button> {/* Button to edit the movie */}
        </div>
    );
};

export default MovieDetails;
