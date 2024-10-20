import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import CardMedia from '@mui/material';
import Typography from '@mui/material';
import useStore from '../useStore';

const BooksList = () => {
    const {books, setBooks} = useStore();
    const getAllBooks = async () => {
        try {
            const response = await axios.get('/get-all-books');
            setBooks(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        
    );
}

export default BooksList;