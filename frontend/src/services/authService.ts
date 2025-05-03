import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8081/auth';

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    username: string;
}

export interface UserProfile {
    username: string;
    avatarUrl?: string;
}

export const login = async (request: AuthRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/login`, request);
    const data = response.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    return data;
};

export const register = async (request: AuthRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/register`, request);
    const data = response.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    return data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getUsername = (): string | null => {
    return localStorage.getItem('username');
};

export const getProfile = async (): Promise<UserProfile> => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const updateProfile = async (profile: UserProfile): Promise<UserProfile> => {
    const token = getToken();
    const response = await axios.put(`${API_URL}/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}; 