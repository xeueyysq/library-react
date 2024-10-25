import { Grid } from '@mui/material';
import { useStore } from '../useStore';
import GoogleBookCard from './GoogleBookCard';
import LibraryBookCard from './LibraryBookCard';
import { mapGoogleBookToDBBook } from '../helpers/book';

const BooksList = ({ books, type, borrowedBookIds }) => {
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
            />
            ))
        )}
        </Grid>
    );
};

export default BooksList;