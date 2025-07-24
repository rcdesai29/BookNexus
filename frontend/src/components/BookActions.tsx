import { Alert, Button, Snackbar, Stack } from '@mui/material';
import React, { useState } from 'react';
import { BookService } from '../app/services/services/BookService';

interface BookActionsProps {
  bookId: number;
  isBorrowed?: boolean;
  canApproveReturn?: boolean;
}

const BookActions: React.FC<BookActionsProps> = ({ bookId, isBorrowed, canApproveReturn }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleAction = async (action: 'borrow' | 'return' | 'approveReturn') => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (action === 'borrow') {
        await BookService.borrowBook(bookId);
        setMessage('Book borrowed successfully!');
      } else if (action === 'return') {
        await BookService.returnBorrowBook(bookId);
        setMessage('Return request sent!');
      } else if (action === 'approveReturn') {
        await BookService.approveReturnBorrowBook(bookId);
        setMessage('Return approved!');
      }
    } catch (err: any) {
      setError(err?.body?.message || 'Action failed');
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        {!isBorrowed && <Button variant="contained" onClick={() => handleAction('borrow')} disabled={loading}>Borrow</Button>}
        {isBorrowed && <Button variant="outlined" onClick={() => handleAction('return')} disabled={loading}>Return</Button>}
        {canApproveReturn && <Button variant="outlined" onClick={() => handleAction('approveReturn')} disabled={loading}>Approve Return</Button>}
      </Stack>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        {error
          ? <Alert severity="error" onClose={() => setOpen(false)}>{error}</Alert>
          : message
            ? <Alert severity="success" onClose={() => setOpen(false)}>{message}</Alert>
            : undefined}
      </Snackbar>
    </>
  );
};

export default BookActions; 