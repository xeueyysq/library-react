import { useParams } from "react-router-dom";
import { useStore } from "../useStore";
import BooksList from "../components/BooksList";
import { Typography } from "@mui/material";
import MyAppBar from "../components/MyAppBar";

const SearchPage = () => {
    const {book} = useParams();
    const {findBooks} = useStore();

    return (
        <>
            <MyAppBar/>
            <Typography gutterBottom variant="h5" component="div" margin={'30px'}>Поиск "{book}"</Typography>
            <BooksList books={findBooks} type={'search'}/>
        </>
    )
}

export default SearchPage;