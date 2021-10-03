import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { filtersAspectRatio } from '../../../lib/types/image';
import FilterBar from '../../components/FilterBar/FilterBar';
import Input from '../../components/Input/Input';
import SearchResult from '../../components/SearchResult/SearchResult';
import useFetchSearchImages from '../../hooks/useFetchSearchImages';
import styles from './Search.module.css';

export type SearchProps = {
  className?: string;
};

export default function Search({ className = '' }: SearchProps): JSX.Element {
  const { query } = useParams<{ query: string }>();

  const [inputValue, setInputValue] = useState<string>(query);
  const [searchValue, setSearchValue] = useState<string>('');
  const [fetchMoreImages, setFetchMoreImages] = useState<boolean>(false);

  const [filterAspectRatio, setFilterAspectRatio] = useState<filtersAspectRatio>('nofilter');
  const [filterColor, setFilterColor] = useState<number>(0);

  const { imagesResult, isLoading, isFetchingNewResult } = useFetchSearchImages(
    fetchMoreImages,
    searchValue,
    filterAspectRatio,
    filterColor
  );

  useEffect(() => {
    if (query) handleSubmit();
  }, [query]);

  useEffect(() => {
    setFetchMoreImages(false);
  }, [fetchMoreImages]);

  function handleScroll(position: number, parentHeight: number) {
    if (!fetchMoreImages && 3 * parentHeight > -position) setFetchMoreImages(true);
  }

  function handleSubmit() {
    if (inputValue === searchValue) return;
    setSearchValue(inputValue);
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
          onChangeAspectRatio={setFilterAspectRatio}
          onChangeColor={setFilterColor}
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
