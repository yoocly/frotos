import React from 'react';
import Button from '../Button/Button';
import type { iconKey } from '../Icon/icons';
import styles from './NavBarImage.module.css';

export const NAVBARIMAGE_ITEMS = ['details', 'collection', 'download', 'palette'] as const;
export type NavBarImageItems = typeof NAVBARIMAGE_ITEMS[number];

const itemIconMap: { [item in NavBarImageItems]: iconKey } = {
  details: 'info',
  download: 'download',
  palette: 'palette',
  collection: 'collection',
};

export type NavBarImageProps = {
  active: NavBarImageItems | null;
  onClick: (item: NavBarImageItems) => void;
  className?: string;
};

export default function NavBarImage({
  active,
  onClick,
  className = '',
}: NavBarImageProps): JSX.Element {
  const colorDefault = `mediumGradient`;
  const colorActive = `primaryGradient`;
  const colorHover = `lightPrimary`;

  const items = NAVBARIMAGE_ITEMS.map((item) => (
    <Button
      icon={itemIconMap[item]}
      color={active === item ? colorActive : colorDefault}
      hoverColor={active === item ? colorActive : colorHover}
      transparent
      large
      className={`${styles.navItem} ${active === item ? styles.navItemActive : ``}`}
      onClick={() => onClick(item)}
      key={item}
    />
  ));

  return <nav className={`${styles.navBar} ${className}`}>{items}</nav>;
}
