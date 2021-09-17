import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import type { imagesResult } from '../../../api/apis';
import SearchResultImage from '../SearchResultImage/SearchResultImage';
import Spinner from '../Spinner/Spinner';
import styles from './SearchResult.module.css';

export type SearchResultProps = {
  isLoading: boolean;
  imagesResult: imagesResult | null;
  onImageClick: (id: string) => void;
  onCollectionClick: (id: string) => void;
  className?: string;
};

export default function SearchResult({
  isLoading,
  imagesResult,
  onImageClick,
  onCollectionClick,
  className = '',
}: SearchResultProps): JSX.Element {
  const [masonryComplete, setMasonryComplete] = useState<boolean>(true);
  if (isLoading && masonryComplete) setMasonryComplete(false);

  const columns = Math.min(4, Math.floor(window.innerWidth / 150));
  const resultWidth = 100 / columns;

  return (
    <>
      {imagesResult?.count === 0 || (!isLoading && !imagesResult) ? (
        <span>No results</span>
      ) : (
        <>
          <Spinner show={!masonryComplete} className={styles.spinner} />
          {imagesResult && imagesResult.count > 0 && (
            <Masonry
              updateOnEachImageLoad={false}
              elementType={'section'}
              onLayoutComplete={() => setMasonryComplete(true)}
              className={`${!masonryComplete ? styles.loading : styles.loaded} ${className}`}
            >
              {imagesResult?.results.map((image) => {
                return (
                  <SearchResultImage
                    image={image}
                    width={`calc(${resultWidth}%`}
                    inCollection={false}
                    onClick={() => onImageClick(image.id)}
                    onCollectionClick={() => onCollectionClick(image.id)}
                    className={styles.searchResultImage}
                    key={`${image.api}${image.id}`}
                  />
                );
              })}
            </Masonry>
          )}
        </>
      )}
    </>
  );
}
