import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input';
import styles from './Splash.module.css';
export type SplashProps = {
  className?: string;
};

export default function Splash({ className = '' }: SplashProps): JSX.Element {
  const [showSlogan1, setShowSlogan1] = useState<boolean>(false);
  const [showSlogan2, setShowSlogan2] = useState<boolean>(false);
  const [showSlogan3, setShowSlogan3] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>('');

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => setShowSlogan1(true), 1000);
    setTimeout(() => setShowSlogan2(true), 2000);
    setTimeout(() => setShowSlogan3(true), 3000);
    setTimeout(() => setShowSearch(true), 5000);
  });

  function handleSubmit() {
    if (inputValue) history.push(`/search/${inputValue}`);
  }

  return (
    <div className={`${styles.splash} ${className}`}>
      <BackgroundImage>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            <Icon icon="logo" height={'6rem'} width={'6rem'} />
            <div className={styles.title}>FROTOS</div>
            <div className={styles.subtitle}>
              <span className={styles.accent}>Fr</span>ee Ph
              <span className={styles.accent}>otos</span>
            </div>
            <div className={styles.slogan}>
              <span className={!showSlogan1 ? styles.hide : styles.show}>
                Search
                <span className={styles.frotos}>.</span>
              </span>
              <span className={!showSlogan2 ? styles.hide : styles.show}>
                Manage
                <span className={styles.frotos}>.</span>
              </span>
              <span className={!showSlogan3 ? styles.hide : styles.show}>
                Download
                <span className={styles.frotos}>.</span>
              </span>
            </div>
            <div className={`${!showSearch ? styles.hide : styles.show}`}>
              <Input
                placeholder="Search photos"
                submitIcon="search"
                value={inputValue}
                onChange={(inputValue) => setInputValue(inputValue)}
                onSubmit={handleSubmit}
                className={styles.search}
              />
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
}
