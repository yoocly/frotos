import React from 'react';
import Headline from '../../components/Headline/Headline';
import styles from './About.module.css';

export type AboutProps = {
  className?: string;
};

export default function About({ className = '' }: AboutProps): JSX.Element {
  return (
    <div className={`${styles.about} ${className}`}>
      <Headline level={1}>
        About <span className={styles.frotos}>FROTOS</span>
      </Headline>
      <section className={styles.content}>
        <p>
          <span className={styles.frotos}>FROTOS</span> helps you to search free stock photos for
          your next web project. It is a metasearch of the three big providers Unsplash, Pixabay,
          and Pexels. You can search and filter as well as manage photos in your own collections and
          download them conveniently.
        </p>
      </section>
      <Headline level={2}>About the developer</Headline>
      <section className={styles.content}>
        <p>
          I'm Dirk from Leipzig, Germany. This is my first demo React App on my way to a
          professional software developer.
        </p>
        <p>
          I develop web apps using React, Node, Typescript etc. assisted by more than 10 years of IT
          project management experience. Check out my{' '}
          <a href="https://dirk-zukunft.de/github" className={styles.link}>
            Github Repo
          </a>
          !
        </p>
        <p>
          If you think I can help you, don't hesitate to{' '}
          <a href="mailto:frotos@dirk-zukunft.de" className={styles.link}>
            contact me
          </a>
          .
        </p>
      </section>
    </div>
  );
}
