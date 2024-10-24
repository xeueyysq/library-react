import {Grid2} from '@mui/material';
import {useStore} from '../useStore';
import BookCard from './BookCard';

const BooksList = ({books}) => {
    // const {books} = useStore();

    return (
        <Grid2 container spacing={2} margin={'30px'}>
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    title={book?.volumeInfo?.title ? book.volumeInfo.title : book?.title}
                    author={book?.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : book?.author}
                    year={book?.volumeInfo?.publishedDate || book?.year}
                    poster={book?.volumeInfo?.imageLinks?.smallThumbnail || book?.poster || '/images/no_poster.jpg'}
                />
            ))}
        </Grid2>
    );
}

export default BooksList;