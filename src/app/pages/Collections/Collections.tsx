import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import SearchResult from '../../components/SearchResult/SearchResult';
import useCollectionImages from '../../hooks/useCollectionImages';
import useCollections from '../../hooks/useCollections';
import useCurrentUser from '../../hooks/useCurrentUser';
import styles from './Collections.module.css';

export type CollectionsProps = {
  className?: string;
};

export default function Collections({ className = '' }: CollectionsProps): JSX.Element {
  const history = useHistory();
  const currentUser = useCurrentUser();
  if (!currentUser) history.push(`/profile`);

  const collections = useCollections(currentUser);
  const [showCollectionImages, setShowCollectionImages] = useState<{
    collectionId: string;
    collectionName: string;
  } | null>(null);

  const [showAddCollectionModal, setShowAddCollectionModal] = useState<boolean>(false);
  const [addCollectionName, setAddCollectionName] = useState<string>('');

  const collectionImages = useCollectionImages(showCollectionImages?.collectionId || null);

  function handleAddCollection() {
    console.log(addCollectionName);
  }

  return showCollectionImages ? (
    <main className={`${styles.collectionImages} ${className}`}>
      <Headline level={1} className={styles.title}>
        <Button
          icon="back"
          transparent
          onClick={() => setShowCollectionImages(null)}
          className={styles.backButton}
        />
        {showCollectionImages.collectionName}
      </Headline>
      <SearchResult
        isLoading={false}
        imagesResult={collectionImages}
        className={styles.imagesList}
        handleScroll={() => true}
      />
    </main>
  ) : (
    <main className={`${styles.collections} ${className}`}>
      <Headline level={1}>Collections</Headline>
      <ul>
        {collections &&
          collections.map((collection) => (
            <li
              className={styles.item}
              key={collection._id}
              id={collection._id}
              onClick={() =>
                setShowCollectionImages({
                  collectionId: collection._id || '',
                  collectionName: collection.collectionName,
                })
              }
            >
              <div
                style={{
                  backgroundImage: `url(${
                    collection.imageCount ? collection.lastImage?.[0].image.thumbnail : ``
                  })`,
                }}
                className={styles.image}
              ></div>
              <div>
                {collection.collectionName}
                {collection.imageCount !== undefined && (
                  <div className={styles.imageCount}>{collection.imageCount} Images</div>
                )}
              </div>
            </li>
          ))}
      </ul>
      <Button icon="add" text="Add collection" onClick={() => setShowAddCollectionModal(true)} />
      <Modal
        show={showAddCollectionModal}
        closeButton
        onClose={() => setShowAddCollectionModal(false)}
      >
        <div className={styles.modalAdd}>
          <Headline level={2} className={styles.headline}>
            Add collection
          </Headline>
          <Input
            placeholder="Collection name"
            submitIcon="add"
            value={addCollectionName}
            onChange={(inputValue) => setAddCollectionName(inputValue)}
            onSubmit={handleAddCollection}
          />
        </div>
      </Modal>
    </main>
  );
}
