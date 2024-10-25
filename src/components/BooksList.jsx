// src/components/BooksList.js
import { Grid } from '@mui/material';
import GoogleBookCard from './GoogleBookCard';
import LibraryBookCard from './LibraryBookCard';
import { mapGoogleBookToDBBook } from '../helpers/book';

const BooksList = ({ books, type, borrowedBookIds, onBorrow, onReturn }) => {
  return (
    <Grid container spacing={2} margin={'30px'}>
      {type === 'search' ? (
        books.map((book) => (
          <GoogleBookCard
            key={book.id}
            book={mapGoogleBookToDBBook(book)}
          />
        ))
      ) : (
        books.map((book) => (
          <LibraryBookCard
            key={book.id}
            book={book}
            isBorrowed={borrowedBookIds.has(book.id)}
            onBorrow={onBorrow}
            onReturn={onReturn}
          />
        ))
      )}
    </Grid>
  );
};

export default BooksList;
