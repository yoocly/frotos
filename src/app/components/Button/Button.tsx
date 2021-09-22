import React from 'react';
import type { colorKey } from '../../lib/colors';
import { COLORS } from '../../lib/colors';
import Icon from '../Icon/Icon';
import type { iconKey } from '../Icon/icons';
import styles from './Button.module.css';

export type ButtonProps = {
  icon?: iconKey;
  text?: string;
  color?: colorKey;
  small?: boolean;
  large?: boolean;
  transparent?: boolean;
  iconShadow?: boolean;
  inactive?: boolean;
  onClick?: () => void;
  externalLink?: string;
  className?: string;
};

export default function Button({
  icon = 'none',
  text,
  color = 'lightPrimary',
  small = false,
  large = false,
  transparent = false,
  iconShadow = false,
  inactive = false,
  onClick = () => {
    return;
  },
  externalLink,
  className = '',
}: ButtonProps): JSX.Element {
  const { colorClass } = COLORS[color];

  const iconElement = (
    <Icon
      icon={icon}
      color={color}
      width={small ? '1rem' : large ? '2rem' : undefined}
      height={small ? '1rem' : large ? '2rem' : undefined}
    />
  );
  const textElement = <div className={`${colorClass}`}>{text}</div>;

  if (externalLink)
    return (
      <a
        href={externalLink}
        target="_blank"
        className={`${styles.button} ${colorClass} ${small ? styles.small : ``} ${
          transparent ? styles.transparent : ``
        } ${inactive ? styles.inactive : ``} ${className}`}
      >
        {icon && iconElement} {text && textElement}
      </a>
    );

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${colorClass} ${small ? styles.small : ``} ${
        transparent ? styles.transparent : ``
      } ${inactive ? styles.inactive : ``} ${className}`}
    >
      {icon && iconElement} {text && textElement}
    </button>
  );
}
