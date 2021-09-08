import React from 'react';
import styles from './Headline.module.css';

export type HeadlineProps = {
  level?: number;
  styling?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Headline({
  level = 1,
  styling = 'default',
  children,
  className = '',
}: HeadlineProps): JSX.Element {
  const headlineLevel = level in [1, 2, 3, 4, 5, 6] ? level : 1;
  const CustomHeadline = `h${headlineLevel}` as keyof JSX.IntrinsicElements;

  return (
    <CustomHeadline className={`${styles.headline} ${styles[styling]} ${className}`}>
      {children}
    </CustomHeadline>
  );
}
