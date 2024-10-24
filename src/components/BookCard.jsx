import { CardContent, CardMedia, Typography, Card} from '@mui/material';

const BookCard = ({title, author, year, poster}) => {
    return (
        <Card>
            <CardContent>
                <CardMedia
                    component="img"
                    image={poster}
                    alt={title}
                    style={{
                        width: '200px',
                        height: '300px',
                        objectFit: 'cover',
                    }}
                /> 
                <Typography gutterBottom variant="h5" component="div" maxWidth={'200px'}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} maxWidth={'200px'}>
                    {author} — {year}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BookCard;