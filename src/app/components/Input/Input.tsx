import React from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import type { iconKey } from '../Icon/icons';
import styles from './Input.module.css';

export type InputProps = {
  placeholder?: string;
  icon?: iconKey;
  password?: boolean;
  submitIcon?: iconKey;
  value: string;
  onSubmit?: () => void;
  onChange?: () => void;
  className?: string;
};

export default function Input({
  placeholder = '',
  icon = 'none',
  password = false,
  submitIcon = 'none',
  value = '',
  onSubmit = () => {
    return;
  },
  onChange,
  className = '',
}: InputProps): JSX.Element {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.input} ${className}`}>
      <Icon icon={icon} className={styles.icon} />
      <input
        className={styles.inputField}
        type={password ? `password` : `text`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {submitIcon && submitIcon !== 'none' && (
        <Button icon={submitIcon} className={styles.submitButton} />
      )}
    </form>
  );
}
