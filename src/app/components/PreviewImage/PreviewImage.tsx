import React from 'react';
import type { image } from '../../../lib/types/image';
import Spinner from '../Spinner/Spinner';
import styles from './PreviewImage.module.css';

export type PreviewImageProps = {
  image: image | null;
  className?: string;
};

export default function PreviewImage({ image, className = '' }: PreviewImageProps): JSX.Element {
  if (!image) return <></>;

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
