import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Link } from '@mui/material';
import { register } from '../services/authService';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register({ username, password });
            navigate('/tasks');
        } catch (err) {
            setError('Username already exists');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
                fontFamily: 'Nunito, Inter, Roboto, Arial, sans-serif',
            }}
        >
            <Box
                sx={{
                    width: { xs: '98%', sm: '90%', md: '60%', lg: '30%' },
                    maxWidth: 420,
                    mx: 'auto',
                    bgcolor: 'rgba(40,40,60,0.55)',
                    borderRadius: 6,
                    p: { xs: 2, sm: 5 },
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    minHeight: 420,
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 3, textAlign: 'center', letterSpacing: 1 }}>
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                        sx={{
                            input: { color: '#fff', fontWeight: 600 },
                            label: { color: '#fff' },
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.08)',
                            boxShadow: '0 1px 4px 0 rgba(31, 38, 135, 0.10)',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                '& fieldset': { borderColor: '#fff' },
                                '&:hover fieldset': { borderColor: '#764ba2' },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            input: { color: '#fff', fontWeight: 600 },
                            label: { color: '#fff' },
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.08)',
                            boxShadow: '0 1px 4px 0 rgba(31, 38, 135, 0.10)',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                '& fieldset': { borderColor: '#fff' },
                                '&:hover fieldset': { borderColor: '#764ba2' },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{
                            input: { color: '#fff', fontWeight: 600 },
                            label: { color: '#fff' },
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.08)',
                            boxShadow: '0 1px 4px 0 rgba(31, 38, 135, 0.10)',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                '& fieldset': { borderColor: '#fff' },
                                '&:hover fieldset': { borderColor: '#764ba2' },
                            },
                        }}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1, fontWeight: 600, textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontWeight: 800,
                            fontSize: 20,
                            borderRadius: 3,
                            boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
                            background: 'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
                            letterSpacing: 1,
                            transition: 'background 0.3s',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #ff7eb3 0%, #ff758c 100%)',
                            },
                        }}
                    >
                        SIGN UP
                    </Button>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Link href="/login" variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Register; 