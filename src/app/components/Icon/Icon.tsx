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
  iconClass?: string;
};

export default function Icon({
  icon = 'none',
  color = 'primaryGradient',
  height = '1.5rem',
  width = '1.5rem',
  className = '',
  iconClass = '',
}: IconProps): JSX.Element {
  const { iconify, svg }: icon = ICONS[icon];
  const { colorClass, gradientFillClass, gradientSVG }: color = COLORS[color];

  if (!(iconify || svg)) return <></>;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {iconify && (
        <IconifyIcon
          icon={iconify}
          width={height}
          height={width}
          className={`${colorClass} ${
            gradientFillClass ? styles[gradientFillClass] : ``
          } ${iconClass}`}
        />
      )}
      {svg && svg(height, width, COLORS[color], iconClass)}
      {gradientSVG && gradientSVG()}
    </div>
  );
}
