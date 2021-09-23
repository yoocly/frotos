import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import Button from '../Button/Button';
import styles from './Modal.module.css';

export const MODAL_POSITIONS = ['centered', 'bottomRight'] as const;
export const modalDefaultSize = {
  desktop: {
    minHeight: '5rem',
    minWidth: '80vw',
    height: '',
    width: '',
    maxHeight: '80vh',
    maxWidth: '90vw',
  },
  mobile: {
    minHeight: '',
    minWidth: '',
    height: '100vh',
    width: '100vw',
    maxHeight: '',
    maxWidth: '',
  },
};
export type modalSize = typeof modalDefaultSize;

export type ModalProps = {
  show?: boolean;
  backgroundOverlay?: boolean;
  backgroundBlur?: boolean;
  size?: modalSize;
  position?: typeof MODAL_POSITIONS[number];
  closeButton?: boolean;
  backButton?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  show = true,
  backgroundOverlay = true,
  backgroundBlur = false,
  size = modalDefaultSize,
  position = 'centered',
  closeButton = false,
  backButton = false,
  onClose = () => {
    return;
  },
  children,
  className = '',
}: ModalProps): JSX.Element {
  if (!show) return <></>;

  return (
    <>
      {backgroundOverlay && (
        <div
          className={`${styles.overlay} ${backgroundBlur ? styles.backgroundBlur : ``}`}
          onClick={onClose}
        ></div>
      )}
      <div
        style={isMobileOnly ? size.mobile : size.desktop}
        className={`${styles.modal} ${styles[position]} ${className}`}
      >
        {closeButton && (
          <Button
            icon="close"
            color="light"
            large
            transparent
            onClick={onClose}
            className={styles.closeButton}
          />
        )}
        {backButton && (
          <Button
            icon="back"
            color="light"
            large
            transparent
            iconShadow
            onClick={onClose}
            className={styles.backButton}
          />
        )}
        <div style={isMobileOnly ? size.mobile : size.desktop} className={styles.modalContent}>
          {children}
        </div>
      </div>
    </>
  );
}
