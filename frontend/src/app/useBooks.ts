import { useEffect, useState } from 'react';
import type { PageResponseBookResponse } from './services/models/PageResponseBookResponse';
import { BookService } from './services/services/BookService';

export function useBooks(page: number = 0, size: number = 10) {
  const [data, setData] = useState<PageResponseBookResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    BookService.findAllBooks(page, size)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page, size]);

  return { data, loading, error };
} 