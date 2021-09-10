import React from 'react';
import type { color, colorKey } from '../../lib/colors';
import { COLORS } from '../../lib/colors';
import Icon from '../Icon/Icon';
import type { iconKey } from '../Icon/icons';
import styles from './Button.module.css';

export type ButtonProps = {
  icon?: iconKey;
  text?: string;
  color?: colorKey;
  small: boolean;
  transparent: boolean;
  onClick: () => void;
  className?: string;
};

export default function Button({
  icon,
  text,
  color = 'lightPrimary',
  small = false,
  transparent = false,
  onClick,
  className = '',
}: ButtonProps): JSX.Element {
  const colorItem: color = COLORS[color];

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${colorItem.colorClass} 
        ${small ? styles.small : ``} ${transparent ? styles.transparent : ``} ${className}`}
    >
      {icon && (
        <Icon icon={icon} color={color} width={small ? '1rem' : ''} height={small ? '1rem' : ''} />
      )}
      {text && <div className={`${colorItem.colorClass}`}>{text}</div>}
    </button>
  );
}
