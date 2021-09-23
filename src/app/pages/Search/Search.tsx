import React, { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import type { image } from '../../../api/apis';
import ImageDetails from '../../components/ImageDetails/ImageDetails';
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

const imageSize = {
  desktop: {
    maxHeight: 45,
    maxWidth: 60,
  },
  mobile: {
    maxHeight: 40,
    maxWidth: 100,
  },
};

const modalSize = {
  desktop: {
    height: `${2 * imageSize.desktop.maxHeight}%`,
    width: `${imageSize.desktop.maxWidth}%`,
  },
  mobile: {
    height: `${2.5 * imageSize.mobile.maxHeight}%`,
    width: `${imageSize.mobile.maxWidth}%`,
  },
};

export default function Search({ className = '' }: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [fetchMoreImages, setFetchMoreImages] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<image | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<NavBarImageItems>('details');

  const { imagesResult, isLoading, isFetchingNewResult } = useFetchSearchImages(
    fetchMoreImages,
    searchValue
  );

  useEffect(() => {
    setFetchMoreImages(false);
  }, [fetchMoreImages]);

  function calcImageHeight(): number {
    if (!selectedImage) return 0;

    const imageMaxSize = isMobileOnly ? imageSize.mobile : imageSize.desktop;
    const imageAspectRatio = selectedImage.height / selectedImage.width || 1;
    return Math.min(
      ((window.innerWidth * imageMaxSize.maxWidth) / 100) * imageAspectRatio,
      (window.innerHeight * imageMaxSize.maxHeight) / 100
    );
  }

  function handleScroll(position: number, parentHeight: number) {
    if (!fetchMoreImages && 3 * parentHeight > -position) setFetchMoreImages(true);
  }

  function handleSubmit() {
    if (inputValue === searchValue) return;
    setSearchValue(inputValue);
    setFetchMoreImages(true);
  }

  const imageHeight = calcImageHeight();

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
        size={modalSize}
      >
        <div className={styles.modalContent}>
          <div style={{ height: `${imageHeight}px` }}>
            <PreviewImage image={selectedImage} />
          </div>
          <NavBarImage onClick={(item) => setModalActiveTab(item)} active={modalActiveTab} />
          <div className={styles.modalTabContent}>
            {modalActiveTab === 'details' && <ImageDetails image={selectedImage} />}
            {modalActiveTab === 'collection' && 'collection'}
            {modalActiveTab === 'download' && 'Download'}
            {modalActiveTab === 'palette' && 'palette'}
          </div>
        </div>
      </Modal>
    </main>
  );
}
