import type { imagesResult } from '../../api/apis';
import useFetch from './useFetch';

export default function useFetchSearchImages(query: string): {
  imagesResult: imagesResult | null;
  errorMessage: string | null;
  isLoading: boolean;
} {
  const url = query && `/api/images/${query}`;
  const result = useFetch<imagesResult>(url);

  return {
    imagesResult: result.data,
    errorMessage: result.errorMessage,
    isLoading: result.isLoading,
  };
}
