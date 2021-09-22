import React, { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import type { image } from '../../../api/apis';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import type { NavBarImageItems } from '../../components/NavBarImage/NavBarImage';
import NavBarImage from '../../components/NavBarImage/NavBarImage';
import PreviewImage from '../../components/PreviewImage/PreviewImage';
import SearchResult from '../../components/SearchResult/SearchResult';
import useFetchSearchImages from '../../hooks/useFetchSearchImages';
import styles from './Search.module.css';

export type SearchProps = {
  className?: string;
};

export default function Search({ className = '' }: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [fetchMoreImages, setFetchMoreImages] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<image | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<NavBarImageItems | null>('details');

  const { imagesResult, isLoading, isFetchingNewResult } = useFetchSearchImages(
    fetchMoreImages,
    searchValue
  );

  useEffect(() => {
    setFetchMoreImages(false);
  }, [fetchMoreImages]);

  function handleScroll(position: number, parentHeight: number) {
    if (!fetchMoreImages && 3 * parentHeight > -position) setFetchMoreImages(true);
  }

  function handleSubmit() {
    setSearchValue(inputValue);
    setFetchMoreImages(true);
  }

  return (
    <main className={`${styles.search} ${className}`}>
      <Input
        placeholder="Search photos"
        submitIcon="search"
        value={inputValue}
        onChange={(inputValue) => setInputValue(inputValue)}
        onSubmit={handleSubmit}
        className={styles.input}
      />
      <div className={styles.filterBar}>
        <div>{imagesResult && `${imagesResult.count.toLocaleString()} results`}</div>
        <div className={styles.filter}></div>
      </div>
      <SearchResult
        isLoading={isLoading}
        isFetchingNewResult={isFetchingNewResult}
        imagesResult={imagesResult}
        onImageClick={(id) => {
          setSelectedImage(imagesResult?.results[id] || null);
          setModalActiveTab('details');
        }}
        onCollectionClick={(id) => console.log(`clicked collection on image ${id}`)}
        handleScroll={handleScroll}
        className={styles.searchResult}
      />
      <Modal
        show={!!selectedImage}
        backgroundBlur
        closeButton={!isMobileOnly}
        backButton={isMobileOnly}
        onClose={() => setSelectedImage(null)}
      >
        <div className={styles.modalContent}>
          <PreviewImage image={selectedImage} />
          <NavBarImage onClick={(item) => setModalActiveTab(item)} active={modalActiveTab} />
          {modalActiveTab}
        </div>
      </Modal>
    </main>
  );
}
