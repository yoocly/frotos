import React from 'react';
import Masonry from 'react-masonry-component';
import type { image } from '../../../api/apis';
import SearchResultImage from '../SearchResultImage/SearchResultImage';
import styles from './SearchResult.module.css';

export type SearchResultProps = {
  images: image[];
  onImageClick: () => void;
  className?: string;
};

export default function SearchResult({ images, className = '' }: SearchResultProps): JSX.Element {
  const columns = Math.min(5, Math.floor(window.innerWidth / 150));
  const resultWidth = 100 / columns;

  return (
    <div className={`${styles.searchResult} ${className}`}>
      <Masonry updateOnEachImageLoad={true} className={styles.searchGrid}>
        {images.map((image) => {
          return (
            <SearchResultImage
              image={image}
              width={`calc(${resultWidth}%`} // - 2 * ${columns} * var(--gapSmall))`}
              inCollection={false}
              onClick={() => console.log(`clicked image ${image.id}`)}
              onCollectionClick={() => console.log(`clicked collection on image ${image.id}`)}
              className={styles.searchResultImage}
              key={`${image.api}${image.id}`}
            />
          );
        })}
      </Masonry>
    </div>
  );
}
