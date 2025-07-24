import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { BookResponse } from '../app/services/models/BookResponse';
import { BookService } from '../app/services/services/BookService';
import BookActions from '../components/BookActions';
import BookFeedback from '../components/BookFeedback';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // Placeholder logic for status
  const isBorrowed = false; // TODO: Replace with real logic
  const canApproveReturn = false; // TODO: Replace with real logic

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    BookService.findBookById(Number(id))
      .then(setBook)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Container sx={{ mt: 4 }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error.message || String(error)}</Alert></Container>;
  if (!book) return <Container sx={{ mt: 4 }}><Alert severity="info">Book not found.</Alert></Container>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{book.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>by {book.authorName}</Typography>
      <Typography variant="body1" gutterBottom>ISBN: {book.isbn}</Typography>
      <Typography variant="body2" gutterBottom>{book.synopsis}</Typography>
      <Box sx={{ mt: 2 }}>
        <BookActions bookId={book.id!} isBorrowed={isBorrowed} canApproveReturn={canApproveReturn} />
      </Box>
      <BookFeedback bookId={book.id!} />
    </Container>
  );
};

export default BookDetailPage; 