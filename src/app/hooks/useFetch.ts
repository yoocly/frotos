import { useState, useEffect } from 'react';

export default function useFetch<T>(url: string): {
  data: T | null;
  errorMessage: string | null;
  isLoading: boolean;
  refetch: () => void;
} {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const isLoading = data === null && errorMessage === null;

  function refetch() {
    setErrorMessage(null);
    setData(null);
    fetch(url)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((error) => setErrorMessage(error.toString()));
  }

  useEffect(() => {
    refetch();
  }, [url]);
  console.log(`Loading: ${isLoading} `);

  return { data, isLoading, errorMessage, refetch };
}
