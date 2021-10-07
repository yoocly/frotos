import axios from 'axios';
import download from 'js-file-download';
import { useQuery } from 'react-query';
import type { image } from '../../lib/types/image';
import type { IMAGE_FORMATS } from '../components/DownloadForm/DownloadForm';

export type downloadImageOptions = {
  format: typeof IMAGE_FORMATS[number];
  width: number;
  height: number;
  quality: number;
};

export function useDownloadImage(
  image: image | null,
  options: downloadImageOptions,
  setDownloadImage: (image: image | null) => void
): boolean {
  const downloadImageResult = useQuery('downloadImage', () => downloadImage(image, options), {
    retry: false,
    enabled: !!image,
  });
  const { isFetching } = downloadImageResult;

  if (image !== null && !isFetching) setDownloadImage(null);

  return isFetching;
}

async function downloadImage(image: image | null, options: downloadImageOptions) {
  return await axios
    .post(
      '/api/images/download',
      {
        image,
        options,
      },
      { responseType: 'blob' }
    )
    .then((res) => {
      download(res?.data, `image.${options.format}`);
    });
}
