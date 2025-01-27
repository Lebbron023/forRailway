import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


function Login() {
    // State to manage email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // useNavigate should be placed here, not inside the handleSubmit function
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            // Store the JWT token in localStorage
            localStorage.setItem('token', response.data.token);

            // Log success to the console
            console.log('Login successful');

            // Optionally, alert the user
            alert('Login successful!');

            // Redirect to the home page
            navigate('/home');  // Use navigate for redirection

        } catch (err) {
            // Access the error message from the response
            const errorMessage = err.response?.data?.message || 'An error occurred during login.';
            setError(errorMessage);  // Set the specific error message
        }
    };

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-black to-red-500">
                <div className="flex">
                    <div className="left bg-gray-200 flex justify-center items-center border rounded-lg">
                        <div className="flex flex-col w-[500px] justify-center items-center">
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Flogo-template-png-logo-templates-1655.png&f=1&nofb=1"
                                alt="Sample Logo"
                                className="mb-4 h-[200px] w-[200px] object-contain"
                            />
                            <div>MONVIREY POULTRY FARM</div>
                        </div>
                    </div>
                    <div className="w-[400px] h-[500px] mx-auto p-8 bg-red-200 flex flex-col items-center justify-center">
                        <form noValidate autoComplete="off" className="w-full" onSubmit={handleSubmit}>
                            {/* Username/Email field */}
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"  // This makes the field require a valid email
                                error={!!error}  // Will highlight the input if there is an error
                            />
                            {/* Password field */}
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                error={!!error}  // Will highlight the input if there is an error
                            />

                            {/* Submit button */}
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '1rem' }}
                            >
                                Login
                            </Button>

                            {/* Error message */}
                            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

                            <p className="text-sm font-sm text-right mt-2">Forgot password</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
