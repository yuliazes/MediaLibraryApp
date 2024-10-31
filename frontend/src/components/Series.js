import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddSerie from './AddSerie';

const Series = () => {
    const [series, setSeries] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if no token
            navigate('/login');
            return;
        }

        // Fetch series from API
        api.get('/series')
            .then((response) => {
                console.log('API response:', response.data); // Log the response here
                setSeries(response.data.series);
            })
            .catch((err) => {
                console.error('Error fetching series:', err);
                setError('Failed to load series');
            });
    }, [navigate]);
    const handleAddSerie = (newSerie) => {
        setSeries([...series, newSerie]);}
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Media Library - Series</h1>
            <AddSerie onAdd={handleAddSerie} />
            <ul>
                {series.map((serie) => (
                    <li key={serie._id}>
                    <h2>{serie.title}</h2>
                    <p>Release Date: {serie.releaseDate}</p>
                    <p>Status: {serie.status}</p>
                    <p>Rating: {serie.rating}</p>
                    <Link to={`/series/${serie._id}`}>View Details</Link> {/* Link to detailed view */}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Series;