import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerProps = {
  show?: boolean;
  className?: string;
};

export default function Spinner({ show = true, className = '' }: SpinnerProps): JSX.Element {
  return (
    <>
      {' '}
      {show && (
        <div className={`${styles.spinner} ${className}`}>
          <div className={styles.spinnerA}>
            <div className={styles.spinnerB}>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
