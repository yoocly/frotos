import { Icon as IconifyIcon } from '@iconify/react';
import React from 'react';
import type { color, colorKey } from '../../lib/colors';
import { COLORS } from '../../lib/colors';
import styles from './Icon.module.css';
import type { icon, iconKey } from './icons';
import { ICONS } from './icons';

export { ICONS };
export type { iconKey };

export type IconProps = {
  icon: iconKey;
  color?: colorKey;
  height?: string;
  width?: string;
  className?: string;
};

export default function Icon({
  icon,
  color = 'primaryGradient',
  height = '1.5rem',
  width = '1.5rem',
  className = '',
}: IconProps): JSX.Element {
  const iconElement: icon = ICONS[icon];
  const colorElement: color = COLORS[color];

  return (
    <>
      {iconElement.iconify && (
        <IconifyIcon
          icon={iconElement.iconify}
          width={height}
          height={width}
          style={{ color: `var(--${colorElement.cssVar})` }}
          className={`${
            colorElement.gradientFillClass ? styles[colorElement.gradientFillClass] : ``
          } ${className}`}
        />
      )}
      {iconElement.svg && iconElement.svg(height, width, colorElement, className)}
      {colorElement.gradientSVG && colorElement.gradientSVG()}
    </>
  );
}
