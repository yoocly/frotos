import React from 'react';
import styles from './BackgroundImage.module.css';
import splash from '../../../assets/splash.webp';

export type BackgroundImageProps = {
  dim?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default function BackgroundImage({
  dim = true,
  children,
  className = '',
}: BackgroundImageProps): JSX.Element {
  return (
    <div
      style={{ backgroundImage: `url("${splash}")` }}
      className={`${styles.backgroundImage} ${className}`}
    >
      {dim ? <div className={styles.dim}>{children}</div> : children}
    </div>
  );
}
