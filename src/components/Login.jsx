import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../useStore';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { username, password });
            const userData = response.data.user;
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка входа');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Вход
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                {error && <Typography color="error">{error}</Typography>}
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button type="submit" variant="contained" color="primary">
                        Войти
                    </Button>
                    <Button variant="outlined" onClick={handleBack}>
                        Назад
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default Login;
