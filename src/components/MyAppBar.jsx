import {AppBar, Toolbar, Link, Grid2, Select, MenuItem, InputBase, IconButton, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from '../useStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AccountCircle } from '@mui/icons-material';

const MyAppBar = () => {
    const navigate = useNavigate();
    const [book, setBook] = useState('');
    const {searchBook, setSearchBook, findBooks, setFindBooks} = useStore();

    const search = async () => {
        try {
            setSearchBook(book);
            const booksList = await axios.post('/api/books/find-books', { book });
            console.log(booksList.data);
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

    return (
        <AppBar position='static' sx={{ height: '56px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href='/' sx={{ display: 'flex', alignItems: 'center'}}>
                    <Typography color='white' fontSize={'20px'}>
                        <b>
                            Globus Book Voyage
                        </b>
                    </Typography>
                </Link>
                <Grid2 sx={{width: '40%', display: 'flex', alignItems: 'center', marginLeft: '16px'}}>
                    {/* <Select
                    value={movieType}
                    onChange={(e) => {setMovieType(e.target.value)}}
                    sx={{backgroundColor: 'white', height: '32px', '&:focus': {
                        borderRadius: 0,
                        borderColor: 'white',
                        boxShadow: 'white',
                        },}}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='movie'>Movies</MenuItem>
                        <MenuItem value='series'>Series</MenuItem>
                    </Select> */}
                    <InputBase
                    value={book}
                    placeholder="Search movie by title..."
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
                </Grid2>
                <AccountCircle/>
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar;