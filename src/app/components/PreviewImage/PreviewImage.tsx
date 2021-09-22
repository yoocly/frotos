import React from 'react';
import type { image } from '../../../api/apis';
import Spinner from '../Spinner/Spinner';
import styles from './PreviewImage.module.css';

export type PreviewImageProps = {
  image: image;
  className?: string;
};

export default function PreviewImage({ image, className = '' }: PreviewImageProps): JSX.Element {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <Spinner className={styles.spinner} />
      <div
        style={{ backgroundImage: `url(${image.preview})` }}
        className={styles.previewImage}
      ></div>
    </div>
  );
}
