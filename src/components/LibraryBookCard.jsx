import { CardContent, CardMedia, Typography, Card, CardActions, Button } from '@mui/material';
import BookModal from './BookModal';
import { useState } from 'react';

const LibraryBookCard = ({ book, isBorrowed, onBorrow, onReturn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBorrowOrReturn = (e) => {
    e.stopPropagation();
    if (isBorrowed) {
      onReturn(book);
    } else {
      onBorrow(book);
    }
  };

  const poster = book?.poster || '/images/no_poster.jpg';

  return (
    <>
      <Card onClick={openModal} sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}>
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
          <Button size='small' onClick={handleBorrowOrReturn}>
            {isBorrowed ? 'Отдать' : 'Взять'}
          </Button>
        </CardActions>
      </Card>
      {isOpen && <BookModal book={book} onClose={closeModal} open={isOpen} />}
    </>
  );
};

export default LibraryBookCard;
