import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Importing a CSS file for custom styling

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Media Library Dashboard</h1>
            <p className="dashboard-welcome">Welcome! Choose a category to explore:</p>
            <div className="dashboard-links">
                <Link to="/books" className="dashboard-link-card">
                    <h2>Books</h2>
                    <p>Explore your favorite books and add new ones.</p>
                </Link>
                <Link to="/movies" className="dashboard-link-card">
                    <h2>Movies</h2>
                    <p>View and rate the latest movies.</p>
                </Link>
                <Link to="/series" className="dashboard-link-card">
                    <h2>Series</h2>
                    <p>Track and discover new series.</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;