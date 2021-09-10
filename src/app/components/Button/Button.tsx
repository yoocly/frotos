import React from 'react';
import type { iconKey } from '../Icon/icons';
import styles from './Button.module.css';

export type ButtonProps = {
  icon?: iconKey;
  text?: string;
  small: boolean;
  transparent: boolean;
  className?: string;
};

export default function Button({
  icon,
  text,
  small = false,
  transparent = false,
  className = '',
}: ButtonProps): JSX.Element {
  return <div className={`${styles.button} ${className}`}>Button</div>;
}
