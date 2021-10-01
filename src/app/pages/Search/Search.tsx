import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import type { filtersAspectRatio, image } from '../../../lib/types/image';
import Button from '../../components/Button/Button';
import FilterBar from '../../components/FilterBar/FilterBar';
import Headline from '../../components/Headline/Headline';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import SearchResult from '../../components/SearchResult/SearchResult';
import useCurrentUser from '../../hooks/useCurrentUser';
import useFetchSearchImages from '../../hooks/useFetchSearchImages';
import styles from './Search.module.css';

export type SearchProps = {
  className?: string;
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
  const { query } = useParams<{ query: string }>();

  const [inputValue, setInputValue] = useState<string>(query);
  const [searchValue, setSearchValue] = useState<string>('');
  const [fetchMoreImages, setFetchMoreImages] = useState<boolean>(false);

  const [filterAspectRatio, setFilterAspectRatio] = useState<filtersAspectRatio>('nofilter');
  const [filterColor, setFilterColor] = useState<number>(0);
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
    searchValue,
    filterAspectRatio,
    filterColor
  );

  useEffect(() => {
    if (query) handleSubmit();
  }, [query]);

  useEffect(() => {
    setFetchMoreImages(false);
  }, [fetchMoreImages]);

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
        <FilterBar
          imageCount={imagesResult && imagesResult.count}
          aspectRatio={filterAspectRatio}
          color={filterColor}
          onChangeAspectRatio={setFilterAspectRatio}
          onChangeColor={setFilterColor}
        />
        <SearchResult
          isLoading={isLoading}
          isFetchingNewResult={isFetchingNewResult}
          imagesResult={imagesResult}
          onCollectionClick={(index) => handleAddToCollection(imagesResult?.results[index])}
          handleScroll={handleScroll}
          className={styles.searchResult}
        />

        <Modal
          show={modalAddToCollectionExtended === false}
          position="bottomRightSlide"
          size={popupSize}
          backgroundOverlay={false}
        >
          <div className={styles.popupSmall}>
            <Icon
              icon={addToCollectionResult?.success ? 'check' : 'close'}
              color="mediumGradient"
            />
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
            <Button
              icon="check"
              text="Done"
              onClick={() => setModalAddToCollectionExtended(null)}
            />
          </div>
        </Modal>
      </main>
    </>
  );
}
