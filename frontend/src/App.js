import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Books from './components/Books';
import Movies from './components/Movies'; // Assuming you have this component
import Series from './components/Series'; // Assuming you have this component
import Login from './Login';
import Dashboard from './pages/Dashboard';
import BookDetails from './components/BookDetails';
import MovieDetails from './components/MovieDetails';
import SerieDetails from './components/SerieDetails';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/books"
                    element={isAuthenticated ? <Books /> : <Navigate to="/login" />}
                />
                   <Route
                    path="/books/:id" // New route for viewing a specific book's details
                    element={isAuthenticated ? <BookDetails /> : <Navigate to="/login" />}
                />
                <Route
                    path="/movies"
                    element={isAuthenticated ? <Movies /> : <Navigate to="/login" />}
                />
                <Route
                    path="/movies/:id" // New route for viewing a specific movie's details
                    element={isAuthenticated ? <MovieDetails /> : <Navigate to="/login" />}
                    />
                <Route
                    path="/series"
                    element={isAuthenticated ? <Series /> : <Navigate to="/login" />}
                />
                      <Route
                    path="/series/:id" // New route for viewing a specific serie's details
                    element={isAuthenticated ? <SerieDetails /> : <Navigate to="/login" />}
                    />
                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
                />
            </Routes>
        </Router>
    );
}

export default App;