import React, { useState } from 'react';
import colorwheel from '../../../assets/colorwheel.webp';
import type { filtersAspectRatio } from '../../pages/Search/Search';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './FilterBar.module.css';

export type filterBarProps = {
  imageCount: number | null;
  aspectRatio: filtersAspectRatio;
  color: number;
  onChangeAspectRatio: (aspectRatio: filtersAspectRatio) => void;
  onChangeColor: (color: number) => void;
  className?: string;
};

const modalFilter = {
  desktop: {
    minHeight: ``,
    minWidth: ``,
    height: ``,
    width: ``,
    maxHeight: ``,
    maxWidth: ``,
  },
  mobile: {
    minHeight: ``,
    minWidth: ``,
    height: ``,
    width: ``,
    maxHeight: ``,
    maxWidth: ``,
  },
};

export default function FilterBar({
  imageCount,
  aspectRatio,
  color,
  onChangeAspectRatio,
  onChangeColor,
  className = '',
}: filterBarProps): JSX.Element {
  const [modalFilterAspectRatio, setModalFilterAspectRatio] = useState<boolean>(false);
  const [modalFilterColor, setModalFilterColor] = useState<boolean>(false);

  function resetFilters() {
    setModalFilterAspectRatio(false);
    setModalFilterColor(false);
  }

  function getColorFilters(isModal = false) {
    return [
      <img
        src={colorwheel}
        className={`${styles.color} ${!isModal ? styles.filterButtonColor : ``}`}
        key={0}
        onClick={
          isModal
            ? () => {
                onChangeColor(0);
                resetFilters();
              }
            : () => {
                resetFilters();
                setModalFilterColor(true);
              }
        }
      />,
      ...Array.from({ length: 11 }, (_v, index) => (
        <div
          className={`${styles.color} ${styles[`color${index + 1}`]} ${
            !isModal ? styles.filterButtonColor : ``
          }`}
          key={index + 1}
          onClick={
            isModal
              ? () => {
                  onChangeColor(index + 1);
                  resetFilters();
                }
              : () => {
                  resetFilters();
                  setModalFilterColor(true);
                }
          }
        ></div>
      )),
    ];
  }

  return (
    <div className={`${styles.filterBar} ${className}`}>
      <div className={styles.resultCount}>
        {imageCount !== 0 && `${imageCount?.toLocaleString()} results`}
      </div>
      <div className={styles.filter}>
        <div>
          <Button
            icon={aspectRatio === 'no-filter' ? 'filterFormat' : aspectRatio}
            color="medium"
            transparent
            onClick={() => {
              resetFilters();
              setModalFilterAspectRatio(true);
            }}
          />
          <Button
            icon="down"
            color="medium"
            transparent
            onClick={() => {
              resetFilters();
              setModalFilterAspectRatio(true);
            }}
          />
          <Modal
            show={!!modalFilterAspectRatio}
            size={modalFilter}
            backgroundOverlay={false}
            position="relative"
            className={styles.modalAspectRatio}
          >
            <div className={styles.filterAspectRatio}>
              <Button
                icon="filterFormat"
                color="mediumGradient"
                transparent
                large
                onClick={() => {
                  onChangeAspectRatio('no-filter');
                  resetFilters();
                }}
              />
              <Button
                icon="landscape"
                color="mediumGradient"
                transparent
                large
                onClick={() => {
                  onChangeAspectRatio('landscape');
                  resetFilters();
                }}
              />
              <Button
                icon="square"
                color="mediumGradient"
                transparent
                large
                onClick={() => {
                  onChangeAspectRatio('square');
                  resetFilters();
                }}
              />
              <Button
                icon="portrait"
                color="mediumGradient"
                transparent
                large
                onClick={() => {
                  onChangeAspectRatio('portrait');
                  resetFilters();
                }}
              />
            </div>
          </Modal>
        </div>
        <div>
          {getColorFilters()[color]}
          <Button
            icon="down"
            color="medium"
            transparent
            onClick={() => {
              resetFilters();
              setModalFilterColor(true);
            }}
          />
          <Modal
            show={!!modalFilterColor}
            size={modalFilter}
            backgroundOverlay={false}
            position="relative"
            className={styles.modalColor}
          >
            <div className={styles.filterColor}>{getColorFilters(true)}</div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
