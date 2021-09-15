import React from 'react';
import styles from './BackgroundImage.module.css';

export type BackgroundImageProps = {
  image?: string;
  dim?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default function BackgroundImage({
  image = 'splash',
  dim = true,
  children,
  className = '',
}: BackgroundImageProps): JSX.Element {
  return (
    <div
      style={{ backgroundImage: `url("${image}.webp")` }}
      className={`${styles.backgroundImage} ${className}`}
    >
      {dim ? <div className={styles.dim}>{children}</div> : children}
    </div>
  );
}
