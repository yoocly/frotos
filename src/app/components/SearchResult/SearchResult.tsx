import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import type { image } from '../../../api/apis';
import SearchResultImage from '../SearchResultImage/SearchResultImage';
import Spinner from '../Spinner/Spinner';
import styles from './SearchResult.module.css';

export type SearchResultProps = {
  images: image[];
  onImageClick: (id: string) => void;
  onCollectionClick: (id: string) => void;
  className?: string;
};

export default function SearchResult({
  images,
  onImageClick,
  onCollectionClick,
  className = '',
}: SearchResultProps): JSX.Element {
  const [masonryComplete, setMasonryComplete] = useState<boolean>(false);

  const columns = Math.min(4, Math.floor(window.innerWidth / 150));
  const resultWidth = 100 / columns;

  return (
    <>
      <Spinner show={!masonryComplete} className={styles.spinner} />
      <Masonry
        updateOnEachImageLoad={false}
        elementType={'section'}
        onLayoutComplete={() => setMasonryComplete(true)}
        className={`${!masonryComplete ? styles.loading : styles.loaded} ${className}`}
      >
        {images.map((image) => {
          return (
            <SearchResultImage
              image={image}
              width={`calc(${resultWidth}%`} // - 2 * ${columns} * var(--gapSmall))`}
              inCollection={false}
              onClick={() => onImageClick(image.id)}
              onCollectionClick={() => onCollectionClick(image.id)}
              className={styles.searchResultImage}
              key={`${image.api}${image.id}`}
            />
          );
        })}
      </Masonry>
    </>
  );
}
