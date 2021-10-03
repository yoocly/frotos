import React from 'react';
import type { image } from '../../../lib/types/image';
import Button from '../Button/Button';
import styles from './SearchResultImage.module.css';

export type SearchResultImageProps = {
  image: image;
  width: string;
  inCollection?: boolean;
  onClick: () => void;
  onCollectionClick: () => void;
  className?: string;
};

export default function SearchResultImage({
  image,
  width,
  inCollection = false,
  onClick,
  onCollectionClick,
  className = '',
}: SearchResultImageProps): JSX.Element {
  const { urlSource, author, urlAuthor, thumbnail, title, api } = image;

  return (
    <article className={`${styles.container} ${className}`} style={{ width: width }}>
      <div className={styles.thumbnailWrapper}>
        <img src={thumbnail} className={styles.thumbnail} alt={title} onClick={onClick} />
        <Button
          className={styles.collectionButton}
          icon={inCollection ? 'collectionAdded' : 'collection'}
          color={inCollection ? 'mediumGradient' : undefined}
          inactive={inCollection}
          transparent
          iconShadow
          onClick={onCollectionClick}
        />
      </div>
      <span className={styles.author}>
        &copy;&nbsp;
        {urlAuthor ? (
          <a href={urlAuthor} target="_blank" className={styles.authorLink}>
            {author}
          </a>
        ) : (
          author
        )}
      </span>
      <span className={styles.api}>
        {urlSource ? (
          <a href={urlSource} target="_blank" className={styles.authorLink}>
            {api}
          </a>
        ) : (
          api
        )}
      </span>
    </article>
  );
}
