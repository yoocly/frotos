import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import type { MutableRefObject } from 'react';
import React, { useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import type { imagesResult } from '../../../api/apis';
import SearchResultImage from '../SearchResultImage/SearchResultImage';
import Spinner from '../Spinner/Spinner';
import styles from './SearchResult.module.css';

export type SearchResultProps = {
  isLoading: boolean;
  isFetchingNewResult: boolean;
  imagesResult: imagesResult | null;
  onImageClick: (id: string) => void;
  onCollectionClick: (id: string) => void;
  handleScroll: (position: number, parentHeight: number) => void;
  className?: string;
};

export default function SearchResult({
  isLoading,
  isFetchingNewResult,
  imagesResult,
  onImageClick,
  onCollectionClick,
  handleScroll,
  className = '',
}: SearchResultProps): JSX.Element {
  const [masonryComplete, setMasonryComplete] = useState<boolean>(true);
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

  return (
    <section className={className} ref={searchResultElement}>
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
        className={`${!masonryComplete ? styles.loading : ``}`}
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
              key={image.id}
            />
          );
        })}
      </Masonry>
      <div ref={searchResultEndElement}></div>
    </section>
  );
}
