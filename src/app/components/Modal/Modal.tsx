import React, { useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import Button from '../Button/Button';
import styles from './Modal.module.css';

export const MODAL_POSITIONS = ['centered', 'bottomRight'] as const;
export const modalDefaultSize = {
  desktop: { height: '80vh', width: '80vh', maxHeight: '90vh', maxWidth: '90vh' },
  mobile: { height: '100vh', width: '100vh', maxHeight: '', maxWidth: '' },
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
  children,
  className = '',
}: ModalProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(show);
  if (!visible) return <></>;

  return (
    <>
      {backgroundOverlay && (
        <div className={`${styles.overlay} ${backgroundBlur ? styles.backgroundBlur : ``}`}></div>
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
            onClick={() => setVisible(!visible)}
            className={styles.closeButton}
          />
        )}
        {backButton && (
          <Button
            icon="back"
            color="light"
            large
            transparent
            onClick={() => setVisible(!visible)}
            className={styles.backButton}
          />
        )}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>
  );
}
