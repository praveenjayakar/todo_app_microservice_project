import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getToken } from './authService';

const API_URL = import.meta.env.VITE_TASKS_API_URL || 'http://localhost:8083/tasks';

export interface Task {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
    username: string;
    createdAt?: string; // ISO string
    completedAt?: string; // ISO string
}

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export const getTasks = async (username: string): Promise<Task[]> => {
    const response = await axiosInstance.get(`/user/${username}`);
    return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
    const response = await axiosInstance.post('/', task);
    return response.data;
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
    const response = await axiosInstance.put(`/${id}`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`);
}; 