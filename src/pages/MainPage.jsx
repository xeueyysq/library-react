import BooksList from "../components/BooksList";
import MyAppBar from "../components/MyAppBar";
import { useStore } from "../useStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Select, MenuItem } from "@mui/material";

const MainPage = () => {
  const { user } = useStore();
  const [viewType, setViewType] = useState('library');
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [borrowedBookIds, setBorrowedBookIds] = useState(new Set());

  const getAvailableBooks = async () => {
    try {
      const response = await axios.get('/api/available-books');
      setLibraryBooks(response.data || []);
    } catch (error) {
      console.error('Ошибка при загрузке доступных книг:', error);
    }
  };

  const getMyBooks = async () => {
    try {
      console.log(`Запрос на получение книг пользователя с ID: ${user.id}`);
      const response = await axios.get(`/api/my-books/${user.id}`);
      console.log('Ответ сервера на запрос книг пользователя:', response.data);
  
      setMyBooks(response.data || []);
      const borrowedIds = new Set(response.data.map((book) => book.id));
      setBorrowedBookIds(borrowedIds);
    } catch (error) {
      console.error('Ошибка при загрузке книг пользователя:', error);
    }
  };
  

  useEffect(() => {
    console.log(`Переключение на ${viewType === 'library' ? 'Книги библиотеки' : 'Мои книги'}`);
    
    if (viewType === 'library') {
      getAvailableBooks();
    } else {
      getMyBooks();
    }
  }, [viewType]);
  

  const handleBorrow = async (book) => {
    try {
      await axios.post('/api/books/borrow', { book_id: book.id, user_id: user.id });
      setLibraryBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
      setMyBooks((prevBooks) => [...prevBooks, book]);
      setBorrowedBookIds((prevIds) => new Set(prevIds).add(book.id));
    } catch (error) {
      console.error('Ошибка при взятии книги:', error);
    }
  };

  const handleReturn = async (book) => {
    try {
      console.log(`Попытка вернуть книгу с ID: ${book.id} пользователем с ID: ${user.id}`);
      
      await axios.post('/api/books/return', { book_id: book.id, user_id: user.id });
      
      setMyBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
      setLibraryBooks((prevBooks) => [...prevBooks, book]);
      setBorrowedBookIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(book.id);
        return newIds;
      });
    } catch (error) {
      console.error('Ошибка при возврате книги:', error);
    }
  };
  

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
        {user?.role === 'читатель' && <MenuItem value='my-books'>Мои книги</MenuItem>}
      </Select>
      <BooksList
        books={booksToDisplay}
        type={viewType}
        onBorrow={handleBorrow}
        onReturn={handleReturn}
        borrowedBookIds={borrowedBookIds}
      />
    </>
  );
};

export default MainPage;
