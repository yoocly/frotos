import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import SearchResult from '../../components/SearchResult/SearchResult';
import useFetchSearchImages from '../../hooks/useSearchImages';
import styles from './Search.module.css';

export type SearchProps = {
  className?: string;
};

export default function Search({ className = '' }: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [callForMoreImages, setCallForMoreImages] = useState<boolean>(false);

  const { imagesResult, isLoading } = useFetchSearchImages(searchValue);

  function handleScroll(position: number, parentHeight: number) {
    if (2 * parentHeight > -position) {
      setCallForMoreImages(true);
    }
  }

  return (
    <main className={`${styles.search} ${className}`}>
      <Input
        placeholder="Search photos"
        submitIcon="search"
        value={inputValue}
        onChange={(inputValue) => setInputValue(inputValue)}
        onSubmit={() => setSearchValue(inputValue)}
        className={styles.input}
      />
      <div className={styles.filterBar}>
        <div>{imagesResult && `${imagesResult.count.toLocaleString()} results`}</div>
        <div className={styles.filter}></div>
      </div>
      <SearchResult
        isLoading={isLoading}
        imagesResult={imagesResult}
        onImageClick={(id) => console.log(`clicked image ${id}`)}
        onCollectionClick={(id) => console.log(`clicked collection on image ${id}`)}
        handleScroll={handleScroll}
        className={styles.searchResult}
      />
    </main>
  );
}
