import React from 'react';
import styles from './Checkbox.module.css';

export type CheckboxProps = {
  checked?: boolean;
  onChange: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Checkbox({
  checked = false,
  onChange,
  children,
  className = '',
}: CheckboxProps): JSX.Element {
  return (
    <label className={`${styles.checkbox} ${className}`}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div>{children}</div>
    </label>
  );
}
