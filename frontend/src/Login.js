import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();  // Hook to programmatically navigate

    const handleLogin = (e) => {
        e.preventDefault();

        // Make the login request
        axios.post('http://localhost:5002/api/auth/login', { email, password })
            .then(response => {
                // Store the token in localStorage
                localStorage.setItem('token', response.data.token);

                // Display success message
                setLoginMessage('Login successful! Redirecting...');
                
                // Redirect to the Dashboard after a short delay
                setTimeout(() => {
                    navigate('/dashboard');  // Redirect to the main dashboard page
                }, 1000);
            })
            .catch(error => {
                console.error('Error during login:', error);
                setLoginMessage('Login failed. Please try again.');
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {loginMessage && <p>{loginMessage}</p>}
        </div>
    );
}

export default Login;