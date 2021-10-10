import React from 'react';
import type { image } from '../../../lib/types/image';
import { useImagePalette } from '../../hooks/useImagePalette';
import Spinner from '../Spinner/Spinner';
import styles from './ImagePalette.module.css';

export type ImagePaletteProps = {
  image: image | null;
  className?: string;
};

export default function ImagePalette({ image, className = '' }: ImagePaletteProps): JSX.Element {
  const palette = useImagePalette(image);

  return (
    <div className={`${styles.imagePalette} ${className}`}>
      {palette ? (
        <>
          <div className={styles.title}>Image colors</div>
          <div className={styles.title}>Complementary colors</div>
          {palette.map((color) => {
            const { css, complementCss: complementcss, lightTextColor: lighttextcolor } = color;
            return (
              <>
                <div
                  className={styles.colorBox}
                  style={{
                    background: css,
                    color: lighttextcolor ? `var(--medium) ` : `var(--dark) `,
                  }}
                  key={`colorBox${color}`}
                >
                  {css}
                </div>
                <div
                  className={styles.colorBox}
                  style={{
                    background: complementcss,
                    color: lighttextcolor ? `var(--medium) ` : `var(--dark) `,
                  }}
                  key={`colorBoxComplement${color}`}
                >
                  {complementcss}
                </div>
              </>
            );
          })}
        </>
      ) : (
        <Spinner className={styles.spinner} />
      )}
    </div>
  );
}
