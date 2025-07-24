import { Alert, CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { BookResponse } from '../app/services/models/BookResponse';
import { BookService } from '../app/services/services/BookService';

const MyBooksPage: React.FC = () => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    BookService.findAllBooksByOwner()
      .then(res => setBooks(res.content || []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Books</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message || String(error)}</Alert>}
      <List>
        {books.map(book => (
          <ListItem key={book.id} divider>
            <ListItemText
              primary={book.title}
              secondary={book.authorName}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MyBooksPage; 