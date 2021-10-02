import React from 'react';
import type { image } from '../../../lib/types/image';
import useCollections from '../../hooks/useCollections';
import useCurrentUser from '../../hooks/useCurrentUser';
import useImageCollections from '../../hooks/useImageCollections';
import Checkbox from '../Checkbox/Checkbox';
import styles from './ImageCollections.module.css';

export type ImageCollectionsProps = {
  image: image | null;
  className?: string;
};

export default function ImageCollections({
  image,
  className = '',
}: ImageCollectionsProps): JSX.Element {
  const currentUser = useCurrentUser();
  const userCollections = useCollections(currentUser);
  const collections = useImageCollections(image, userCollections);

  return (
    <div className={`${styles.imageCollections} ${className}`}>
      <ul>
        {collections &&
          collections.map((collection) => (
            <li
              className={styles.item}
              key={collection._id}
              id={collection._id}
              onClick={() => console.log('click')}
            >
              <div>
                <Checkbox checked={collection.hasSelectedImage} onChange={() => console.log('add')}>
                  {collection.collectionName}
                  {collection.imageCount && (
                    <span className={styles.imageCount}>{collection.imageCount} Images</span>
                  )}
                </Checkbox>
              </div>
              <div
                style={{ backgroundImage: `url(${collection.lastImage?.[0].image.thumbnail})` }}
                className={styles.image}
              ></div>
            </li>
          ))}
      </ul>
    </div>
  );
}
