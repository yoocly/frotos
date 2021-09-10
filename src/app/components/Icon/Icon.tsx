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
  const iconItem: icon = ICONS[icon];
  const colorItem: color = COLORS[color];

  return (
    <div className={styles.wrapper}>
      {iconItem.iconify && (
        <IconifyIcon
          icon={iconItem.iconify}
          width={height}
          height={width}
          style={{ color: `var(--${colorItem.cssVar})` }}
          className={`${
            colorItem.gradientFillClass ? styles[colorItem.gradientFillClass] : ``
          } ${className}`}
        />
      )}
      {iconItem.svg && iconItem.svg(height, width, colorItem, className)}
      {colorItem.gradientSVG && colorItem.gradientSVG()}
    </div>
  );
}
