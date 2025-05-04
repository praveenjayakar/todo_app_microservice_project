/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH_API_URL: string
    readonly VITE_TASKS_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

const API_URL = import.meta.env.VITE_AUTH_API_URL ;
const API_URL = import.meta.env.VITE_TASKS_API_URL; 