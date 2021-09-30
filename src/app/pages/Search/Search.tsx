import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useHistory } from 'react-router';
import type { image } from '../../../lib/types/image';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import Icon from '../../components/Icon/Icon';
import ImageDetails from '../../components/ImageDetails/ImageDetails';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import type { NavBarImageItems } from '../../components/NavBarImage/NavBarImage';
import NavBarImage from '../../components/NavBarImage/NavBarImage';
import PreviewImage from '../../components/PreviewImage/PreviewImage';
import SearchResult from '../../components/SearchResult/SearchResult';
import useCurrentUser from '../../hooks/useCurrentUser';
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

const popupSize = {
  desktop: {
    minHeight: '',
    minWidth: '',
    height: '',
    width: '',
    maxHeight: '',
    maxWidth: '50%',
  },
  mobile: {
    minHeight: '',
    minWidth: '',
    height: '',
    width: '',
    maxHeight: '',
    maxWidth: '85%',
  },
};

export default function Search({ className = '' }: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [fetchMoreImages, setFetchMoreImages] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<image | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<NavBarImageItems>('details');

  const [addToCollectionResult, setAddToCollectionResult] = useState<{
    success: boolean;
    message: JSX.Element;
    collectionName?: string;
    collectionId?: string;
  } | null>(null);
  const [modalAddToCollectionExtended, setModalAddToCollectionExtended] = useState<boolean | null>(
    null
  );
  const modalAddToCollectionExtendedRef = useRef(modalAddToCollectionExtended);
  modalAddToCollectionExtendedRef.current = modalAddToCollectionExtended;

  const currentUser = useCurrentUser();
  const history = useHistory();

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

  async function handleAddToCollection(image: image | undefined): Promise<void> {
    if (!image) return;
    if (!currentUser) history.push(`/profile`);

    try {
      const addToCollectionResult = await axios.post('/api/images', {
        image,
      });
      const { collectionId, collectionName } = addToCollectionResult.data?.result;
      setAddToCollectionResult({
        success: true,
        message: (
          <>
            Added to collection <strong>{collectionName}</strong>
          </>
        ),
        collectionId,
        collectionName,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.resultCode === 501) {
          setAddToCollectionResult({ success: false, message: <>No collection found!</> });
        } else {
          setAddToCollectionResult({ success: false, message: <>Failed to add image!</> });
        }
      }
    }

    setModalAddToCollectionExtended(false);
    setTimeout(() => {
      if (modalAddToCollectionExtendedRef.current === false) setModalAddToCollectionExtended(null);
    }, 4000);
  }

  const imageHeight = calcImageHeight();

  return (
    <>
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
          onImageClick={(index) => {
            setSelectedImage(imagesResult?.results[index] || null);
            setModalActiveTab('details');
          }}
          onCollectionClick={(index) => handleAddToCollection(imagesResult?.results[index])}
          handleScroll={handleScroll}
          className={styles.searchResult}
        />

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
              {modalActiveTab === 'collection' && 'collection'}
              {modalActiveTab === 'download' && 'Download'}
              {modalActiveTab === 'palette' && 'palette'}
            </div>
          </div>
        </Modal>
      </main>

      <Modal
        show={modalAddToCollectionExtended === false}
        position="bottomRightSlide"
        size={popupSize}
        backgroundOverlay={false}
      >
        <div className={styles.popupSmall}>
          <Icon icon={addToCollectionResult?.success ? 'check' : 'close'} color="mediumGradient" />
          <div>{addToCollectionResult?.message}</div>
          {addToCollectionResult?.success && (
            <Button
              icon="edit"
              text="Change"
              small
              onClick={() => setModalAddToCollectionExtended(true)}
            />
          )}
        </div>
      </Modal>

      <Modal
        show={modalAddToCollectionExtended === true}
        position="bottomRight"
        size={popupSize}
        backgroundOverlay={false}
      >
        <div className={styles.popupLarge}>
          <Headline>Add to</Headline>
          <div>Coll123</div>
          <Button icon="check" text="Done" onClick={() => setModalAddToCollectionExtended(null)} />
        </div>
      </Modal>
    </>
  );
}
