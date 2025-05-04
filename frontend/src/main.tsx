import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Environment Variables:', {
  authUrl: import.meta.env.VITE_AUTH_API_URL,
  tasksUrl: import.meta.env.VITE_TASKS_API_URL
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
