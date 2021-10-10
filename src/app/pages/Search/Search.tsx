import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { lastSearch } from '../../App';
import FilterBar from '../../components/FilterBar/FilterBar';
import Input from '../../components/Input/Input';
import SearchResult from '../../components/SearchResult/SearchResult';
import useFetchSearchImages from '../../hooks/useFetchSearchImages';
import styles from './Search.module.css';

export type SearchProps = {
  className?: string;
  lastSearchState: [lastSearch, (s: lastSearch) => void];
};

export default function Search({ className = '', lastSearchState }: SearchProps): JSX.Element {
  const { query } = useParams<{ query: string }>();
  const [lastSearch, setLastSearch] = lastSearchState;
  const { keywords, filterAspectRatio, filterColor } = lastSearch;

  const [inputValue, setInputValue] = useState<string>(query || keywords);
  const [fetchMoreImages, setFetchMoreImages] = useState<boolean>(false);

  const { imagesResult, isLoading, isFetchingNewResult } = useFetchSearchImages(
    fetchMoreImages,
    keywords,
    filterAspectRatio,
    filterColor
  );

  useEffect(() => {
    if (query || lastSearch) handleSubmit();
  }, [query, lastSearch]);

  useEffect(() => {
    setFetchMoreImages(false);
  }, [fetchMoreImages]);

  function handleScroll(position: number, parentHeight: number) {
    if (!fetchMoreImages && 3 * parentHeight > -position) setFetchMoreImages(true);
  }

  function handleSubmit() {
    if (inputValue === keywords) return;
    setLastSearch({ keywords: inputValue, filterAspectRatio, filterColor });
    setFetchMoreImages(true);
  }

  return (
    <>
      <main className={`${styles.search} ${className}`}>
        <Input
          placeholder="Search photos"
          submitIcon="search"
          value={inputValue}
          onChange={(inputValue) => setInputValue(inputValue)}
          onSubmit={handleSubmit}
          className={styles.input}
        />
        <FilterBar
          imageCount={imagesResult && imagesResult.count}
          aspectRatio={filterAspectRatio}
          color={filterColor}
          onChangeAspectRatio={(newFilterAspectRatio) =>
            setLastSearch({
              keywords: inputValue,
              filterAspectRatio: newFilterAspectRatio,
              filterColor,
            })
          }
          onChangeColor={(newFilterColor) =>
            setLastSearch({
              keywords: inputValue,
              filterAspectRatio,
              filterColor: newFilterColor,
            })
          }
        />
        <SearchResult
          isLoading={isLoading}
          isFetchingNewResult={isFetchingNewResult}
          imagesResult={imagesResult}
          handleScroll={handleScroll}
        />
      </main>
    </>
  );
}
