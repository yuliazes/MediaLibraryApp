import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import AddMovie from './AddMovie';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if no token
            navigate('/login');
            return;
        }

        // Fetch movies from API
        api.get('/movies')
            .then((response) => {
                console.log('API response:', response.data); // Log the response here
                setMovies(response.data.movies);
            })
            .catch((err) => {
                console.error('Error fetching movies:', err);
                setError('Failed to load movies');
            });
    }, [navigate]);
    const handleAddMovie = (newMovie) => {
        setMovies([...movies, newMovie]);
    };
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Media Library - Movies</h1>
            <AddMovie onAdd={handleAddMovie} />
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;