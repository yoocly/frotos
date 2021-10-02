import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import type { MutableRefObject } from 'react';
import React, { useRef, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import Masonry from 'react-masonry-component';
import type { image, imagesResult } from '../../../lib/types/image';
import ImageCollections from '../ImageCollections/ImageCollections';
import ImageDetails from '../ImageDetails/ImageDetails';
import Modal from '../Modal/Modal';
import type { NavBarImageItems } from '../NavBarImage/NavBarImage';
import NavBarImage from '../NavBarImage/NavBarImage';
import PreviewImage from '../PreviewImage/PreviewImage';
import SearchResultImage from '../SearchResultImage/SearchResultImage';
import Spinner from '../Spinner/Spinner';
import styles from './SearchResult.module.css';

export type SearchResultProps = {
  isLoading: boolean;
  isFetchingNewResult?: boolean;
  imagesResult: imagesResult | null;
  onCollectionClick: (id: number) => void;
  handleScroll: (position: number, parentHeight: number) => void;
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

const modalDetailsSize = {
  desktop: {
    minHeight: ``,
    minWidth: ``,
    height: `${2 * imageSize.desktop.maxHeight}%`,
    width: `${imageSize.desktop.maxWidth}%`,
    maxHeight: ``,
    maxWidth: ``,
  },
  mobile: {
    minHeight: ``,
    minWidth: ``,
    height: `${2.5 * imageSize.mobile.maxHeight}%`,
    width: `${imageSize.mobile.maxWidth}%`,
    maxHeight: ``,
    maxWidth: ``,
  },
};

export default function SearchResult({
  isLoading,
  isFetchingNewResult = false,
  imagesResult,
  onCollectionClick,
  handleScroll,
  className = '',
}: SearchResultProps): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<image | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<NavBarImageItems>('details');

  const [masonryComplete, setMasonryComplete] = useState<boolean>(false);
  const searchResultElement = useRef<HTMLElement>(null);
  const searchResultEndElement = useRef<HTMLDivElement>(null);

  useScrollPosition(
    ({ currPos }) => handleScroll(currPos.y, searchResultElement.current?.offsetHeight || 0),
    [imagesResult],
    searchResultEndElement as MutableRefObject<HTMLElement>,
    false,
    100,
    searchResultElement as MutableRefObject<HTMLElement>
  );

  if (!isLoading && (!imagesResult || imagesResult?.results.length === 0)) return <></>;
  if (isFetchingNewResult && isLoading && masonryComplete) setMasonryComplete(false);

  const columns = Math.min(4, Math.floor(window.innerWidth / 150));
  const resultWidth = 100 / columns;
  const imageHeight = calcImageHeight();

  function calcImageHeight(): number {
    if (!selectedImage) return 0;

    const imageMaxSize = isMobileOnly ? imageSize.mobile : imageSize.desktop;
    const imageAspectRatio = selectedImage.height / selectedImage.width || 1;
    return Math.min(
      ((window.innerWidth * imageMaxSize.maxWidth) / 100) * imageAspectRatio,
      (window.innerHeight * imageMaxSize.maxHeight) / 100
    );
  }

  return (
    <section className={`${styles.imagesList} ${className}`} ref={searchResultElement}>
      <Spinner show={!masonryComplete} className={styles.spinner} />
      <Masonry
        updateOnEachImageLoad={false}
        onImagesLoaded={() => {
          if (!masonryComplete && !isLoading && !isFetchingNewResult) {
            window.setTimeout(() => {
              setMasonryComplete(true);
            }, 500);
          }
        }}
        className={!masonryComplete ? styles.loading : ``}
      >
        {imagesResult?.results.map((image, index) => {
          return (
            <SearchResultImage
              image={image}
              width={`calc(${resultWidth}%`}
              inCollection={false}
              onClick={() => {
                setSelectedImage(imagesResult?.results[index] || null);
                setModalActiveTab('details');
              }}
              onCollectionClick={() => onCollectionClick(index)}
              className={styles.searchResultImage}
              key={image.id}
            />
          );
        })}
      </Masonry>
      <div ref={searchResultEndElement}></div>

      <Modal
        show={!!selectedImage}
        backgroundBlur
        closeButton={!isMobileOnly}
        backButton={isMobileOnly}
        onClose={() => setSelectedImage(null)}
        size={modalDetailsSize}
      >
        <div className={styles.modalContent}>
          <div style={{ height: `${imageHeight}px` }}>
            <PreviewImage image={selectedImage} />
          </div>
          <NavBarImage onClick={(item) => setModalActiveTab(item)} active={modalActiveTab} />
          <div className={styles.modalTabContent}>
            {modalActiveTab === 'details' && <ImageDetails image={selectedImage} />}
            {modalActiveTab === 'collection' && <ImageCollections image={selectedImage} />}
            {modalActiveTab === 'download' && 'Download'}
            {modalActiveTab === 'palette' && 'palette'}
          </div>
        </div>
      </Modal>
    </section>
  );
}
