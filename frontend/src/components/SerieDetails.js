// src/components/SerieDetails.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to access the serie ID from the URL

const SerieDetails = () => {
    const { id } = useParams(); // Retrieve the serie ID from the URL
    const [serie, setSerie] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate for redirecting to the edit page

    useEffect(() => {
        fetchSerieDetails();
    }, [id]);

    const fetchSerieDetails = async () => {
        try {
            const response = await api.get(`/series/${id}`); // Ensure this matches the backend route
            setSerie(response.data);
        } catch (err) {
            console.error('Error fetching serie details:', err);
            setError('Failed to load serie details');
        }
    };

    const handleEditClick = () => {
        navigate(`/series/${id}/edit`); // Redirect to edit page for this serie
    };

    if (error) return <div>{error}</div>;
    if (!serie) return <div>Loading...</div>;

    return (
        <div>
            <h1>{serie.title}</h1>
            <p>Release Date: {serie.releaseDate}</p>
            <p>Status: {serie.status}</p>
            <p>Rating: {serie.rating}</p>
            <button onClick={handleEditClick}>Edit</button> {/* Button to edit the serie */}
        </div>
    );
};

export default SerieDetails;
