import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './NavBar.module.css';

export type NavBarProps = {
  active?: 'search' | 'collections' | 'profile' | 'about' | undefined;
  className?: string;
};

export default function NavBar({ active, className = '' }: NavBarProps): JSX.Element {
  const history = useHistory();

  const colorDefault = `mediumGradient`;
  const colorActive = `primaryGradient`;

  function redirectTo(target: string) {
    history.push(`/${target}`);
  }

  return (
    <div className={`${isMobileOnly ? styles.mobile : ``} ${styles.navBarWrapper} ${className}`}>
      <nav className={styles.navBar}>
        {!isMobileOnly && <Button icon="logo" transparent large onClick={() => redirectTo(``)} />}

        <Button
          icon="search"
          text={!isMobileOnly ? 'Search' : undefined}
          color={active === 'search' ? colorActive : colorDefault}
          transparent
          large={isMobileOnly}
          small={!isMobileOnly}
          className={`${styles.navItem} ${active === 'search' ? styles.navItemActive : ``}`}
          onClick={() => redirectTo('search')}
        />

        <Button
          icon="collection"
          text={!isMobileOnly ? 'Collections' : undefined}
          color={active === 'collections' ? colorActive : colorDefault}
          transparent
          large={isMobileOnly}
          small={!isMobileOnly}
          className={`${styles.navItem} ${active === 'collections' ? styles.navItemActive : ``}`}
          onClick={() => redirectTo('collections')}
        />

        <Button
          icon="profile"
          text={!isMobileOnly ? 'Profile' : undefined}
          color={active === 'profile' ? colorActive : colorDefault}
          transparent
          large={isMobileOnly}
          small={!isMobileOnly}
          className={`${styles.navItem} ${active === 'profile' ? styles.navItemActive : ``}`}
          onClick={() => redirectTo('profile')}
        />

        <Button
          icon="info"
          text={!isMobileOnly ? 'About' : undefined}
          color={active === 'about' ? colorActive : colorDefault}
          transparent
          large={isMobileOnly}
          small={!isMobileOnly}
          className={`${styles.navItem} ${active === 'about' ? styles.navItemActive : ``}`}
          onClick={() => redirectTo('about')}
        />
      </nav>
    </div>
  );
}
