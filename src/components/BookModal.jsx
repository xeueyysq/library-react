import { Typography, Card, CardContent, CardMedia, Box, Chip } from "@mui/material";
import { Modal, ModalClose, ModalDialog } from '@mui/joy';

const BookModal = ({ book, onClose, open }) => {
    const poster = book?.poster || '/images/no_poster.jpg';
    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ModalDialog
                color="neutral"
                size="lg"
                variant="solid"
                sx={{ 
                    borderRadius: 'md', 
                    p: 0, 
                    width: '100%', 
                    maxWidth: '800px',
                    height: 'auto', 
                    maxHeight: '90vh', 
                    overflow: 'auto'
                }}
            >
                <ModalClose onClick={onClose} />
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        image={poster}
                        alt={book.title}
                        sx={{ 
                            width: '300px',
                            height: '450px',
                            objectFit: 'cover',
                            borderRadius: '4px', 
                            margin: '16px',
                        }}
                    />
                    <CardContent sx={{ 
                        p: 2, 
                        overflowY: 'auto',
                        maxHeight: '70vh' 
                    }}>
                        <Typography component="div" variant="h4" fontWeight="bold">
                            {book.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {book.author}
                        </Typography>
                        <Box mt={2}>
                            <Chip label={book.categories.join(', ')} color="primary" />
                        </Box>
                        <Typography variant="body1" mt={2} sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            {book.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={2}>
                            Количество страниц: {book.pagecount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Дата публикации: {book.publish_date}
                        </Typography>
                    </CardContent>
                </Card>
            </ModalDialog>
        </Modal>
    );
};

export default BookModal;
