import axios, { AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { getToken } from './authService';

const API_URL = (window as any).RUNTIME_CONFIG?.VITE_TASKS_API_URL;

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
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            config.headers.set('Authorization', `Bearer ${token}`);
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