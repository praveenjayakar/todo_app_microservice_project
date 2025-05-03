import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { getProfile, updateProfile, UserProfile } from '../services/authService';
import { AvatarContext } from '../App';

const Profile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [editProfile, setEditProfile] = useState<UserProfile>({ username: '', avatarUrl: '' });
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { setAvatarUrl } = useContext(AvatarContext);

    useEffect(() => {
        setLoading(true);
        getProfile()
            .then((data) => {
                setEditProfile(data);
                setAvatarUrl(data.avatarUrl || '');
            })
            .catch(() => setError('Failed to load profile'))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess('');
        setError('');
        try {
            const updated = await updateProfile(editProfile);
            setAvatarUrl(updated.avatarUrl || '');
            setSuccess('Profile updated!');
        } catch (err: any) {
            setError('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;

    return (
        <Box sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 8,
            bgcolor: 'rgba(40,40,60,0.55)',
            borderRadius: 6,
            p: 4,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>Profile</Typography>
            <Avatar src={editProfile.avatarUrl} sx={{ width: 80, height: 80, mb: 2 }} />
            <Box component="form" onSubmit={handleSave} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Username"
                    name="username"
                    value={editProfile.username}
                    onChange={handleChange}
                    fullWidth
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
                    label="Avatar URL"
                    name="avatarUrl"
                    value={editProfile.avatarUrl || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        input: { color: '#fff' },
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
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={saving}
                    sx={{
                        fontWeight: 800,
                        fontSize: 18,
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
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                {success && <Typography sx={{ color: '#00e676', mt: 1 }}>{success}</Typography>}
                {error && <Typography sx={{ color: '#ff1744', mt: 1 }}>{error}</Typography>}
            </Box>
        </Box>
    );
};

export default Profile; 