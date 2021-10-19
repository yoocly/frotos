import React, { useState } from 'react';
import type { Image } from '../../../lib/types/image';
import { useDownloadImage } from '../../hooks/useDownloadImage';
import Button from '../Button/Button';
import Radio from '../Radio/Radio';
import Slider from '../Slider/Slider';
import Spinner from '../Spinner/Spinner';
import styles from './DownloadForm.module.css';

export const IMAGE_FORMATS = ['avif', 'webp', 'jpg', 'png', 'gif'];
export type DownloadFormProps = {
  image: Image | null;
  className?: string;
};

export default function DownloadForm({ image, className = '' }: DownloadFormProps): JSX.Element {
  const [downloadImage, setDownloadImage] = useState<Image | null>(null);
  const [format, setFormat] = useState<string>('webp');
  const [quality, setQuality] = useState<number>(80);

  const [resolution, setResolution] = useState<{ width: number; height: number }>({
    width: image?.width || 1920,
    height: image?.height || 1280,
  });

  const isFetchingImage = useDownloadImage(
    downloadImage,
    {
      format,
      width: resolution.width,
      height: resolution.height,
      quality,
    },
    setDownloadImage
  );

  if (!image) return <></>;

  const imageHeightRatio = image.height / image.width;
  const resolutions = [{ width: image.width, height: image.height }];
  if (image.width > 3840)
    resolutions.push({ width: 3840, height: Math.round(3840 * imageHeightRatio) });
  if (image.width > 1920)
    resolutions.push({ width: 1920, height: Math.round(1920 * imageHeightRatio) });
  if (image.width > 1280)
    resolutions.push({ width: 1280, height: Math.round(1280 * imageHeightRatio) });
  if (image.width > 640)
    resolutions.push({ width: 640, height: Math.round(640 * imageHeightRatio) });
  if (image.width > 320)
    resolutions.push({ width: 320, height: Math.round(320 * imageHeightRatio) });

  return (
    <section className={`${styles.downloadForm} ${className}`}>
      <Slider
        value={quality}
        min={1}
        max={100}
        icon="quality"
        className={styles.sliderBox}
        onChange={(value) => setQuality(Math.round(value))}
      />
      <div>
        {resolutions.map((resolutionItem) => (
          <Radio
            name="resolution"
            checked={resolutionItem.width === resolution.width}
            key={resolutionItem.width}
            onChange={() => {
              setResolution(resolutionItem);
            }}
          >
            {resolutionItem.width.toLocaleString()} x {resolutionItem.height.toLocaleString()}
          </Radio>
        ))}
      </div>
      <div>
        {IMAGE_FORMATS.map((formatItem) => (
          <Radio
            name="format"
            checked={formatItem === format}
            key={formatItem}
            onChange={() => {
              setFormat(formatItem);
            }}
          >
            {formatItem}
          </Radio>
        ))}
      </div>
      {isFetchingImage ? (
        <Spinner className={styles.button} />
      ) : (
        <Button
          icon="download"
          text="Download"
          onClick={() => setDownloadImage(image)}
          className={styles.button}
        />
      )}
    </section>
  );
}
