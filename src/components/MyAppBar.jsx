import { AppBar, Toolbar, Link, Grid, InputBase, IconButton, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from '../useStore';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const MyAppBar = () => {
    const navigate = useNavigate();
    const [book, setBook] = useState('');
    const { user, setUser, setFindBooks } = useStore();

    const search = async () => {
        try {
            const booksList = await axios.post('/api/books/find-books', { book });
            setFindBooks(booksList.data);
            navigate(`/search/${book}`);
        } catch (error) {
            console.error('Ошибка поиска', error);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AppBar position='static' sx={{ height: '56px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link component={RouterLink} to='/' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography color='white' fontSize={'20px'}>
                        <b>
                            Globus Book Voyage
                        </b>
                    </Typography>
                </Link>
                <Grid sx={{ width: '40%', display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                    <InputBase
                        value={book}
                        placeholder="Поиск книги по названию..."
                        onChange={(e) => setBook(e.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={{
                            backgroundColor: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            height: '32px',
                            width: '70%',
                            flexGrow: 1
                        }}
                    />
                    <IconButton onClick={search} sx={{ marginLeft: '8px', padding: '8px' }}>
                        <SearchIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Grid>
                {user ? (
                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography color='white' sx={{ marginRight: '16px' }}>
                            {user.username}
                        </Typography>
                        <Button color='inherit' onClick={handleLogout}>
                            Выйти
                        </Button>
                    </Grid>
                ) : (
                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color='inherit' component={RouterLink} to='/login'>
                            Войти
                        </Button>
                        <Button color='inherit' component={RouterLink} to='/register'>
                            Регистрация
                        </Button>
                    </Grid>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar;