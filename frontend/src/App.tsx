import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Profile from './components/Profile';
import { isAuthenticated, getProfile } from './services/authService';
import React, { createContext, useState, useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export const AvatarContext = createContext({
  avatarUrl: '',
  setAvatarUrl: (_url: string) => {},
});

function App() {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      getProfile().then(profile => {
        setAvatarUrl(profile.avatarUrl || '');
      }).catch(() => {});
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/tasks" />} />
          </Routes>
        </Router>
      </AvatarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
