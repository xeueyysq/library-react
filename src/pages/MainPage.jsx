import BooksList from "../components/BooksList";
import MyAppBar from "../components/MyAppBar";
import { useStore } from "../useStore";
import { useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const MainPage = () => {
    const {setLibraryBooks, libraryBooks} = useStore();
    const getAllBooks = async () => {
        try {
            const response = await axios.get('/api/books/get-all-books');
            console.log(response);
            setLibraryBooks(response.data || []);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <>
            <MyAppBar/>
            <Typography gutterBottom variant="h5" component="div" margin={'30px'}>Книги библиотеки</Typography>
            <BooksList books={libraryBooks}/>
        </>
    )
}

export default MainPage;