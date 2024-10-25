// src/pages/MainPage.js
import BooksList from "../components/BooksList";
import MyAppBar from "../components/MyAppBar";
import { useStore } from "../useStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Select, MenuItem } from "@mui/material";

const MainPage = () => {
    const { setLibraryBooks, libraryBooks, user } = useStore();
    const [viewType, setViewType] = useState('library');
    const [myBooks, setMyBooks] = useState([]);
    const [borrowedBookIds, setBorrowedBookIds] = useState(new Set());

    const getAllBooks = async () => {
        try {
        const response = await axios.get('/api/books/get-all-books');
        setLibraryBooks(response.data || []);
        } catch (error) {
        console.error(error);
        }
    };

    const getMyBooks = async () => {
        try {
        const response = await axios.get(`/api/my-books/${user.id}`);
        setMyBooks(response.data || []);

        const borrowedIds = new Set(response.data.map(book => book.id));
        setBorrowedBookIds(borrowedIds);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        getAllBooks();
        if (user?.role === 'читатель') {
        getMyBooks();
        }
    }, []);

    const booksToDisplay = viewType === 'library' ? libraryBooks : myBooks;

    return (
        <>
        <MyAppBar />
        {/* <Typography gutterBottom variant="h5" component="div" margin={'30px'}>
            {viewType === 'library' ? 'Книги библиотеки' : 'Мои книги'}
        </Typography> */}
        <Select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            sx={{ margin: '30px', maxHeight: '40px' }}
        >
            <MenuItem value='library'>Книги библиотеки</MenuItem>
            {user?.role === 'читатель' && (
            <MenuItem value='my-books'>Мои книги</MenuItem>
            )}
        </Select>
        <BooksList
            books={booksToDisplay}
            type={viewType}
            borrowedBookIds={borrowedBookIds}
        />
        </>
    );
};

export default MainPage;
