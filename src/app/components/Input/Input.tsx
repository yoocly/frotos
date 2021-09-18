import React from 'react';
import { isMobileOnly } from 'react-device-detect';
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
  onChange: (inputValue: string) => void;
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
    if (isMobileOnly) (document.activeElement as HTMLElement).blur();
    event.preventDefault();
    onSubmit();
  }

  const inputElement = (
    <input
      className={styles.inputField}
      type={password ? `password` : `text`}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
  const iconElement = <Icon icon={icon} className={styles.icon} />;
  const submitButton = <Button icon={submitIcon} className={styles.submitButton} />;

  if (submitIcon && submitIcon !== 'none')
    return (
      <form onSubmit={handleSubmit} className={`${styles.input} ${className}`}>
        {iconElement}
        {inputElement}
        {submitButton}
      </form>
    );

  return (
    <div className={`${styles.input} ${className}`}>
      {iconElement}
      {inputElement}
    </div>
  );
}
