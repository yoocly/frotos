import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import axios from 'axios';
import type { MutableRefObject } from 'react';
import React, { useRef, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import Masonry from 'react-masonry-component';
import { useHistory } from 'react-router';
import type { image, imagesResult } from '../../../lib/types/image';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button/Button';
import DownloadForm from '../DownloadForm/DownloadForm';
import Headline from '../Headline/Headline';
import Icon from '../Icon/Icon';
import ImageCollections from '../ImageCollections/ImageCollections';
import ImageDetails from '../ImageDetails/ImageDetails';
import ImagePalette from '../ImagePalette/ImagePalette';
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
  handleScroll: (position: number, parentHeight: number) => void;
  className?: string;
};

const imageSize = {
  desktop: {
    maxHeight: 33,
    maxWidth: 50,
  },
  mobile: {
    maxHeight: 37.5,
    maxWidth: 100,
  },
};

const modalDetailsSize = {
  desktop: {
    minHeight: ``,
    minWidth: ``,
    height: `calc(${3 * imageSize.desktop.maxHeight}% - 3rem)`,
    width: `30rem`,
    maxHeight: ``,
    maxWidth: ``,
  },
  mobile: {
    minHeight: ``,
    minWidth: ``,
    height: `${2.666 * imageSize.mobile.maxHeight}%`,
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

export default function SearchResult({
  isLoading,
  isFetchingNewResult = false,
  imagesResult,
  handleScroll,
  className = '',
}: SearchResultProps): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<image | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<NavBarImageItems>('details');

  const [masonryComplete, setMasonryComplete] = useState<boolean>(false);
  const searchResultElement = useRef<HTMLElement>(null);
  const searchResultEndElement = useRef<HTMLDivElement>(null);

  const [addToCollectionResult, setAddToCollectionResult] = useState<{
    success: boolean;
    message: JSX.Element;
    collectionName?: string;
    collectionId?: string;
    image?: image;
  } | null>(null);
  const [modalAddToCollectionExtended, setModalAddToCollectionExtended] = useState<boolean | null>(
    null
  );
  const modalAddToCollectionExtendedRef = useRef(modalAddToCollectionExtended);
  modalAddToCollectionExtendedRef.current = modalAddToCollectionExtended;

  const currentUser = useCurrentUser();
  const history = useHistory();

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
        image,
      });

      setModalAddToCollectionExtended(false);
      setTimeout(() => {
        if (modalAddToCollectionExtendedRef.current === false)
          setModalAddToCollectionExtended(null);
      }, 4000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.resultCode === 501) {
          setAddToCollectionResult({
            success: false,
            message: <>No collection found!</>,
            image,
          });
        } else {
          setAddToCollectionResult({
            success: false,
            message: <>Failed to add image!</>,
            image,
          });
        }
      }
      setModalAddToCollectionExtended(true);
    }
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
              onCollectionClick={() => handleAddToCollection(image)}
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
            {modalActiveTab === 'download' && <DownloadForm image={selectedImage} />}
            {modalActiveTab === 'palette' && <ImagePalette image={selectedImage} />}
          </div>
        </div>
      </Modal>

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
          <Headline className={styles.headline}>Add to</Headline>
          <ImageCollections
            className={styles.collections}
            image={addToCollectionResult?.image || null}
          />
          <Button icon="check" text="Done" onClick={() => setModalAddToCollectionExtended(null)} />
        </div>
      </Modal>
    </section>
  );
}
