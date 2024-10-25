// Маппинг полей из Google Books API
export const mapGoogleBookToDBBook = (book) => {
    return {
        id: book.id,
        author: book.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : '',
        title: book.volumeInfo?.title || 'Без названия',
        poster: book.volumeInfo?.imageLinks?.smallThumbnail || '/images/no_poster.jpg',
        description: book.volumeInfo?.description || '',
        pagecount: book.volumeInfo?.pageCount || 0,
        categories: book.volumeInfo?.categories || [''],
        publish_date: book.volumeInfo?.publishedDate || ''
    };
};