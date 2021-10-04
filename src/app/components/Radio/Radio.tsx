import React from 'react';
import styles from './Radio.module.css';

export type RadioProps = {
  checked?: boolean;
  name: string;
  onChange: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Radio({
  checked = false,
  name,
  onChange,
  children,
  className = '',
}: RadioProps): JSX.Element {
  return (
    <label className={`${styles.radio} ${className}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className={styles.styledRadio}></span>
      <span className={styles.labelText}>{children}</span>
    </label>
  );
}
