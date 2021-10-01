import type { CSSProperties } from 'react';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import Button from '../Button/Button';
import styles from './Modal.module.css';

export const MODAL_POSITIONS = ['centered', 'bottomRight', 'relative', 'bottomRightSlide'] as const;
export const modalDefaultSize = {
  desktop: {
    minHeight: '5rem',
    minWidth: '50%',
    height: '',
    width: '',
    maxHeight: 'calc(100% - 5rem)',
    maxWidth: 'calc(100% - 5rem)',
  },
  mobile: {
    minHeight: '',
    minWidth: '',
    height: '100%',
    width: '100%',
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
  style?: CSSProperties;
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
  style = {},
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
        style={{ ...(isMobileOnly ? size.mobile : size.desktop), ...style }}
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
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>
  );
}
