import React from 'react';
import type { image } from '../../../api/apis';
import SearchResultImage from '../SearchResultImage/SearchResultImage';
import styles from './SearchResult.module.css';

export type SearchResultProps = {
  images: image[];
  onImageClick: () => void;
  className?: string;
};

export default function SearchResult({ images, className = '' }: SearchResultProps): JSX.Element {
  return (
    <div className={`${styles.searchResult} ${className}`}>
      {images.map((image) => {
        return (
          <SearchResultImage
            image={image}
            inCollection={false}
            onClick={() => console.log(`clicked image ${image.id}`)}
            onCollectionClick={() => console.log(`clicked collection on image ${image.id}`)}
          />
        );
      })}
    </div>
  );
}
