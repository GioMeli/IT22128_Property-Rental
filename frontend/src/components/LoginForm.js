import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Αποτροπή της default συμπεριφοράς του submit
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password,
            });

            // Αποθήκευση του token στο localStorage
            localStorage.setItem('authToken', response.data.token);

            // Ανακατεύθυνση στον κατάλληλο πίνακα ελέγχου (dashboard)
            if (response.data.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;

