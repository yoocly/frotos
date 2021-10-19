import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import type { FiltersAspectRatio, ImagesResult } from '../../lib/types/image';
import { apiColorKeys } from '../lib/colors';

export type fetchSearchImagesResult = {
  imagesResult: ImagesResult | null;
  isLoading: boolean;
  isFetchingNewResult: boolean;
};

export default function useFetchSearchImages(
  fetchMoreImages: boolean,
  query: string,
  filterAspectRatio: FiltersAspectRatio,
  filterColor: number
): fetchSearchImagesResult {
  const [lastQuery, setLastQuery] = useState<string>('');
  const [lastPage, setLastPage] = useState<number>(1);
  const [lastFilter, setLastFilter] = useState<string>('');
  const [nextPage, setNextPage] = useState<number>(1);
  const [lastResult, setLastResult] = useState<ImagesResult>({ count: 0, results: [] });
  const [totalResult, setTotalResult] = useState<ImagesResult>({ count: 0, results: [] });

  const color = apiColorKeys[filterColor];
  const filter = `${filterAspectRatio}/${color}`;
  const page = query === lastQuery && lastFilter === filter ? nextPage : 1;
  const url = query ? `/api/images/${query}/${page}/${filterAspectRatio}/${color}` : null;

  const fetchResult = useQuery(
    [query, page, filterAspectRatio, color],
    () => axios.get(url || ''),
    {
      retry: false,
      enabled: !!query,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
  const result = fetchResult.data?.data as ImagesResult;
  const resultCount = result?.results.length || 0;

  useEffect(() => {
    if (result && result != lastResult) {
      setTotalResult(
        page > 1
          ? {
              count: result.count,
              results: [
                ...totalResult.results,
                ...result.results.filter((resultItem) => {
                  return !totalResult.results.some((totalItem) => totalItem.id === resultItem.id);
                }),
              ],
            }
          : result
      );
      setLastResult(result);
      setLastQuery(query);
      setLastPage(page);
      setLastFilter(filter);
      if (query !== lastQuery || filter !== lastFilter) setNextPage(1);
    }
  }, [result, lastResult, totalResult, url, query, lastQuery, page, filter, lastFilter]);

  useEffect(() => {
    if (fetchMoreImages && resultCount > 0) setNextPage(lastPage + 1);
  }, [fetchMoreImages, resultCount, lastPage]);

  return {
    imagesResult: totalResult,
    isLoading: fetchResult.isLoading,
    isFetchingNewResult: !result?.results && page === 1,
  };
}
