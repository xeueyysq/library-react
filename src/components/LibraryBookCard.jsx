import { CardContent, CardMedia, Typography, Card, CardActions, Button } from '@mui/material';
import BookModal from './BookModal';
import { useState } from 'react';
import { useStore } from '../useStore';
import axios from 'axios';

const LibraryBookCard = ({ book, isBorrowed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { ability, user } = useStore();
    const [borrowed, setBorrowed] = useState(isBorrowed);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const poster = book?.poster || '/images/no_poster.jpg';

    const handleBorrowOrReturnBook = async (e) => {
        e.stopPropagation();
        try {
            if (!borrowed) {
                const response = await axios.post('/api/books/borrow', { book_id: book.id, user_id: user.id });
                console.log('Книга взята', response.data);
                setBorrowed(true);
            } else {
                const response = await axios.post('/api/books/return', { book_id: book.id, user_id: user.id });
                console.log('Книга возвращена', response.data);
                setBorrowed(false);
            }
        } catch (error) {
            console.error('Ошибка при взятии/возврате книги', error);
        }
    };

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
                        image={poster}
                        alt={book.title}
                        style={{
                            width: '200px',
                            height: '300px',
                            objectFit: 'cover',
                        }}
                    />
                    <Typography gutterBottom variant="h5" component="div" maxWidth={'200px'}>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} maxWidth={'200px'}>
                        {book.author} — {book.publish_date}
                    </Typography>
                </CardContent>
                <CardActions>
                    {ability.can('borrow', 'Book') && (
                        <Button size='small' onClick={handleBorrowOrReturnBook}>
                            {borrowed ? 'Отдать' : 'Взять'}
                        </Button>
                    )}
                </CardActions>
            </Card>
            {isOpen && (
                <BookModal book={book} onClose={closeModal} open={isOpen} />
            )}
        </>
    );
};

export default LibraryBookCard;
