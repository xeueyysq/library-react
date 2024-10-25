import { CardContent, CardMedia, Typography, Card, CardActions, Button } from '@mui/material';
import axios from 'axios';
import BookModal from './BookModal';
import { useState } from 'react';
import { useStore } from '../useStore';

const GoogleBookCard = ({ book }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { ability } = useStore();

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleClickAddBook = async (e) => {
        e.stopPropagation();
        try {
        const response = await axios.post('/api/books/add-book', book);
        console.log('Книга добавлена', response.data);
        } catch (error) {
        console.error('Ошибка добавления книги', error);
        }
    }

    return (
        <>
        <Card
            onClick={openModal}
            sx={{
            cursor: 'pointer',
            '&:hover': {
                boxShadow: 6,
            },
            }}
        >
            <CardContent>
            <CardMedia
                component="img"
                image={book.poster}
                alt={book.title}
                style={{
                width: '200px',
                height: '300px',
                objectFit: 'cover',
                }}
            />
            <Typography gutterBottom variant="h5" component="div" maxWidth={'200px'}
                style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                }}>
                {book.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} maxWidth={'200px'}>
                {book.author} — {book.publish_date}
            </Typography>
            </CardContent>
            <CardActions>
            {ability.can('manage', 'Book') && (
                <Button size='small' onClick={handleClickAddBook}>Добавить</Button>
            )}
            </CardActions>
        </Card>
        {isOpen && (
            <BookModal book={book} onClose={closeModal} open={isOpen} />
        )}
        </>
    )
}

export default GoogleBookCard;