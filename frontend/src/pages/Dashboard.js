// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Media Library Dashboard</h1>
            <p>Welcome! Choose a category to explore:</p>
            <ul>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/series">Series</Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;