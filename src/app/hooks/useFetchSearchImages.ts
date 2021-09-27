import { useEffect, useState } from 'react';
import type { imagesResult } from '../../lib/types/image';
import useFetch from './useFetch';

export type fetchSearchImagesResult = {
  imagesResult: imagesResult | null;
  errorMessage: string | null;
  isLoading: boolean;
  isFetchingNewResult: boolean;
};

export default function useFetchSearchImages(
  fetchMoreImages: boolean,
  query: string
): fetchSearchImagesResult {
  const [lastQuery, setLastQuery] = useState<string>('');
  const [lastPage, setLastPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<number>(1);
  const [lastResult, setLastResult] = useState<imagesResult>({ count: 0, results: [] });
  const [totalResult, setTotalResult] = useState<imagesResult>({ count: 0, results: [] });

  const page = query === lastQuery ? nextPage : 1;
  const url = query ? `/api/images/${query}/${page}` : null;
  const fetchResult = useFetch<imagesResult>(url);

  const result = fetchResult.data;
  const resultCount = result?.results.length || 0;

  useEffect(() => {
    if (result && result != lastResult) {
      setTotalResult(
        page > 1
          ? {
              count: result.count,
              results: [
                ...totalResult.results,
                ...result.results.filter((resultItem) => !totalResult.results.includes(resultItem)),
              ],
            }
          : result
      );

      setLastResult(result);
      setLastQuery(query);
      setLastPage(page);
      if (query !== lastQuery) setNextPage(1);
    }
  }, [result, lastResult, totalResult, url, query, lastQuery, page]);

  useEffect(() => {
    if (fetchMoreImages && resultCount > 0) setNextPage(lastPage + 1);
  }, [fetchMoreImages, resultCount, lastPage]);

  return {
    imagesResult: totalResult,
    errorMessage: fetchResult.errorMessage,
    isLoading: fetchResult.isLoading,
    isFetchingNewResult: !result?.results && page === 1,
  };
}
