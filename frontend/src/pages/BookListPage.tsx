import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';

const BookListPage: React.FC = () => {
  const { data, loading, error, page, setPage } = useBooks();
  const navigate = useNavigate();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1); // Material UI Pagination is 1 based! backend is 0 based!
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Book List</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message || String(error)}</Alert>}
      <div className="book-list-grid">
        {data?.content?.map(book => (
          <div className="book-list-card" key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => navigate(`/books/${book.id}`)}>
              {book.cover ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${book.cover}`}
                  alt={book.title}
                />
              ) : (
                <CardMedia
                  component="div"
                  sx={{ height: 200, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Typography variant="h6" color="text.secondary">No Cover</Typography>
                </CardMedia>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">by {book.authorName}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={e => { e.stopPropagation(); navigate(`/books/${book.id}`); }}>View Details</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      {data && data.totalPages && data.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={data.totalPages}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default BookListPage; 