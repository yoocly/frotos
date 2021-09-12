import React from 'react';
import styles from './Switch.module.css';

export type SwitchProps = {
  value?: boolean;
  onChange: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Switch({
  value = false,
  onChange,
  children,
  className = '',
}: SwitchProps): JSX.Element {
  return (
    <label className={`${styles.switch} ${className}`}>
      <input type="checkbox" checked={value} onChange={onChange} />
      <div className={styles.toggle}></div>
      <div className={styles.toggleActive}></div>
      <div>{children}</div>
    </label>
  );
}
