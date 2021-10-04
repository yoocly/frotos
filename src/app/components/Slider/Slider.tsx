import React from 'react';
import Icon from '../Icon/Icon';
import type { iconKey } from '../Icon/icons';
import styles from './Slider.module.css';

export type SliderProps = {
  value?: number;
  min?: number;
  max?: number;
  icon?: iconKey;
  onChange: (value: number) => void;
  className?: string;
};

export default function Slider({
  value,
  min,
  max,
  icon,
  onChange,
  className = '',
}: SliderProps): JSX.Element {
  return (
    <div className={`${styles.slider} ${className}`}>
      {icon && <Icon icon={icon} color="mediumGradient" className={styles.icon} />}
      <input
        type="range"
        min={min}
        max={max}
        className={styles.sliderInput}
        value={value}
        onChange={(event) => onChange(parseFloat(event.target.value))}
      />
      <div className={styles.value}>{value}%</div>
    </div>
  );
}
