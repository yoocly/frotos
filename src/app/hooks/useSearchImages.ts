import type { imagesResult } from '../../api/apis';
import useFetch from './useFetch';

export default function useSearchImages(query: string): {
  imagesResult: imagesResult | null;
  errorMessage: string | null;
  isLoading: boolean;
} {
  const result = useFetch<imagesResult>(`/api/images/${query}`);

  return {
    imagesResult: result.data,
    errorMessage: result.errorMessage,
    isLoading: result.isLoading,
  };
}
