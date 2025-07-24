import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ActivateAccountPage from './pages/ActivateAccountPage';
import AddBookPage from './pages/AddBookPage';
import BookDetailPage from './pages/BookDetailPage';
import BookListPage from './pages/BookListPage';
import BorrowedBooksPage from './pages/BorrowedBooksPage';
import LoginPage from './pages/LoginPage';
import MyBooksPage from './pages/MyBooksPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate-account" element={<ActivateAccountPage />} />
        <Route path="/books" element={
          <ProtectedRoute>
            <BookListPage />
          </ProtectedRoute>
        } />
        <Route path="/books/:id" element={
          <ProtectedRoute>
            <BookDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/my-books" element={
          <ProtectedRoute>
            <MyBooksPage />
          </ProtectedRoute>
        } />
        <Route path="/borrowed-books" element={
          <ProtectedRoute>
            <BorrowedBooksPage />
          </ProtectedRoute>
        } />
        <Route path="/add-book" element={
          <ProtectedRoute>
            <AddBookPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
