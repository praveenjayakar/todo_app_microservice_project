import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    TextField,
    Checkbox,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Task, getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { getUsername, logout } from '../services/authService';
import { AvatarContext } from '../App';

const getISTTimeString = () => {
    const now = new Date();
    // IST is UTC+5:30
    const istOffset = 5.5 * 60 * 60 * 1000;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + istOffset);
    return istTime.toLocaleTimeString('en-IN', { hour12: true });
};

const TaskList: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const username = getUsername();
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [istTime, setIstTime] = useState(getISTTimeString());
    const { avatarUrl } = useContext(AvatarContext);

    useEffect(() => {
        if (!username) {
            navigate('/login');
            return;
        }
        loadTasks();
        // Update IST time every second
        const interval = setInterval(() => {
            setIstTime(getISTTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, [username, navigate]);

    const loadTasks = async () => {
        if (username) {
            try {
                const data = await getTasks(username);
                setTasks(data);
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);
        setError(null);
        if (!username || !newTaskTitle.trim()) {
            setError('Task title is required.');
            return;
        }
        const now = new Date().toISOString();
        const payload = {
            title: newTaskTitle,
            description: newTaskDescription,
            completed: false,
            username,
            createdAt: now,
        };
        console.log('Sending payload:', payload);
        try {
            const newTask = await createTask(payload);
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setNewTaskDescription('');
            setFeedback('Task added successfully!');
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError('Backend: ' + (error.response.data.message || JSON.stringify(error.response.data)));
            } else {
                setError('Error creating task. Please try again.');
            }
            console.error('Error creating task:', error);
        }
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            let updatedTask: Task;
            if (!task.completed) {
                // Marking as complete, set completedAt
                updatedTask = await updateTask(task.id!, {
                    ...task,
                    completed: true,
                    completedAt: new Date().toISOString(),
                });
            } else {
                // Marking as incomplete, remove completedAt
                updatedTask = await updateTask(task.id!, {
                    ...task,
                    completed: false,
                    completedAt: undefined,
                });
            }
            setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditClick = (task: Task) => {
        setEditTask(task);
        setOpenDialog(true);
    };

    const handleEditSave = async () => {
        if (!editTask) return;

        try {
            const updatedTask = await updateTask(editTask.id!, editTask);
            setTasks(tasks.map((t) => (t.id === editTask.id ? updatedTask : t)));
            setOpenDialog(false);
            setEditTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
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
                    width: { xs: '98%', sm: '90%', md: '60%', lg: '38%' },
                    maxWidth: 700,
                    mx: 'auto',
                    bgcolor: 'rgba(40,40,60,0.55)',
                    borderRadius: 6,
                    p: { xs: 2, sm: 5 },
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    minHeight: 480,
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, letterSpacing: 1, fontSize: { xs: 28, sm: 36 } }}>
                        Todo List
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar
                            src={avatarUrl}
                            sx={{ width: 40, height: 40, cursor: 'pointer', border: '2px solid #fff', bgcolor: '#764ba2' }}
                            onClick={handleProfile}
                        />
                        <Button
                            variant="outlined"
                            onClick={handleLogout}
                            sx={{
                                color: '#fff',
                                borderColor: '#fff',
                                fontWeight: 700,
                                borderRadius: 3,
                                px: 3,
                                py: 1,
                                fontSize: 16,
                                background: 'rgba(255,255,255,0.08)',
                                boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
                                '&:hover': { background: '#fff', color: '#764ba2', borderColor: '#764ba2' },
                            }}
                        >
                            LOGOUT
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 0.5 }}>
                        {username ? `Welcome, ${username}!` : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, bgcolor: '#00e676', borderRadius: '50%' }} />
                        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, fontFamily: 'monospace', fontSize: 18 }}>
                            {istTime}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleCreateTask}
                    sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        fullWidth
                        label="New Task Title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        margin="normal"
                        required
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
                        fullWidth
                        label="Description (optional)"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        margin="normal"
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
                        sx={{
                            mt: 2,
                            fontWeight: 800,
                            fontSize: 20,
                            borderRadius: 3,
                            boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
                            background: 'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
                            width: { xs: '100%', sm: 'auto' },
                            letterSpacing: 1,
                            transition: 'background 0.3s',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #ff7eb3 0%, #ff758c 100%)',
                            },
                        }}
                    >
                        ADD TASK
                    </Button>
                    {feedback && <Typography sx={{ color: '#00e676', mt: 1 }}>{feedback}</Typography>}
                    {error && <Typography sx={{ color: '#ff1744', mt: 1 }}>{error}</Typography>}
                </Box>
                <List sx={{ width: '100%', bgcolor: 'transparent', p: 0 }}>
                    {tasks.length === 0 && (
                        <Typography sx={{ color: '#fff', textAlign: 'center', mt: 2 }}>
                            No tasks yet. Add your first task!
                        </Typography>
                    )}
                    {tasks.map((task, idx) => {
                        // Calculate duration if completed
                        let duration = '';
                        if (task.completed && task.createdAt && task.completedAt) {
                            const start = new Date(task.createdAt).getTime();
                            const end = new Date(task.completedAt).getTime();
                            const diff = Math.max(0, end - start);
                            const seconds = Math.floor((diff / 1000) % 60);
                            const minutes = Math.floor((diff / (1000 * 60)) % 60);
                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            duration =
                                (hours > 0 ? `${hours}h ` : '') +
                                (minutes > 0 ? `${minutes}m ` : '') +
                                `${seconds}s`;
                        }
                        return (
                            <ListItem
                                key={task.id}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.10)',
                                    mb: 2,
                                    borderRadius: 3,
                                    boxShadow: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 1,
                                }}
                            >
                                <Typography sx={{ color: '#fff', fontWeight: 700, mr: 2, minWidth: 24 }}>
                                    {idx + 1}
                                </Typography>
                                <Checkbox
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(task)}
                                    sx={{ color: '#fff', '&.Mui-checked': { color: '#00e676' } }}
                                />
                                <ListItemText
                                    primary={
                                        <span
                                            style={{
                                                color: '#fff',
                                                fontWeight: 700,
                                                textDecoration: task.completed ? 'line-through' : 'none',
                                                fontSize: 18,
                                            }}
                                        >
                                            {task.title}
                                        </span>
                                    }
                                    secondary={
                                        <span style={{ color: '#e0e0e0', fontSize: 15 }}>
                                            {task.description}
                                            {task.createdAt && (
                                                <>
                                                    <br />
                                                    <span style={{ color: '#bdbdbd', fontSize: 13 }}>
                                                        Created: {new Date(task.createdAt).toLocaleTimeString('en-IN', { hour12: true })}
                                                    </span>
                                                </>
                                            )}
                                            {task.completed && task.completedAt && (
                                                <>
                                                    <br />
                                                    <span style={{ color: '#00e676', fontSize: 13 }}>
                                                        Completed in: {duration}
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleEditClick(task)}
                                        sx={{ mr: 1, color: '#fff', '&:hover': { color: '#ff7eb3' } }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleDeleteTask(task.id!)}
                                        sx={{ color: '#fff', '&:hover': { color: '#ff1744' } }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Title"
                            value={editTask?.title || ''}
                            onChange={(e) =>
                                setEditTask(editTask ? { ...editTask, title: e.target.value } : null)
                            }
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={editTask?.description || ''}
                            onChange={(e) =>
                                setEditTask(
                                    editTask ? { ...editTask, description: e.target.value } : null
                                )
                            }
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleEditSave} variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default TaskList; 