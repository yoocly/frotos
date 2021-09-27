import React from 'react';
import type { image } from '../../../lib/types/image';
import Button from '../Button/Button';
import styles from './ImageDetails.module.css';

export type ImageDetailsProps = {
  image: image | null;
  className?: string;
};

export default function ImageDetails({ image, className = '' }: ImageDetailsProps): JSX.Element {
  if (!image) return <></>;

  const {
    title,
    author,
    width,
    height,
    urlSource,
    urlAuthor,
    api,
    aspectRatio,
    likes,
    views,
    downloads,
    createdAt,
  } = image;

  const apiCapitalized = `${api.charAt(0).toUpperCase()}${api.slice(1)}`;
  const createdDate = createdAt && new Date(createdAt);

  return (
    <section className={`${styles.imageDetails} ${className}`}>
      <div className={styles.infos}>
        <div className={styles.sourceButton}>
          <Button icon="view" text={`View on ${apiCapitalized}`} small externalLink={urlSource} />
        </div>
        <p className={styles.author}>
          &copy;&nbsp;
          {urlAuthor ? (
            <a href={urlAuthor} target="_blank" className={styles.authorLink}>
              {author}
            </a>
          ) : (
            author
          )}
        </p>
        {title && <p>{title}</p>}
      </div>

      <div className={styles.detailList}>
        {aspectRatio && (
          <div>
            <p className={styles.label}>Aspect ratio</p>
            <p>{aspectRatio}</p>
          </div>
        )}

        {width && height && (
          <div>
            <p className={styles.label}>Max. resolution</p>
            <p>
              {width.toLocaleString()} x {height.toLocaleString()}
            </p>
          </div>
        )}

        {views && (
          <div>
            <p className={styles.label}>Views</p>
            <p>{views.toLocaleString()}</p>
          </div>
        )}

        {downloads && (
          <div>
            <p className={styles.label}>Downloads</p>
            <p>
              {downloads.toLocaleString()}
              {views && downloads && (
                <span className={styles.info}>
                  {(downloads / views).toLocaleString('de-DE', {
                    style: 'percent',
                    minimumSignificantDigits: 2,
                    maximumSignificantDigits: 2,
                  })}
                </span>
              )}
            </p>
          </div>
        )}

        {likes && (
          <div>
            <p className={styles.label}>Likes</p>
            <p>
              {likes.toLocaleString()}
              {views && likes && (
                <span className={styles.info}>
                  {(likes / views).toLocaleString('de-DE', {
                    style: 'percent',
                    minimumSignificantDigits: 2,
                    maximumSignificantDigits: 2,
                  })}
                </span>
              )}
            </p>
          </div>
        )}

        {createdDate && (
          <div>
            <p className={styles.label}>Created at</p>
            <p>{createdDate.toLocaleDateString('de-DE', { dateStyle: 'medium' })}</p>
          </div>
        )}
      </div>
    </section>
  );
}
