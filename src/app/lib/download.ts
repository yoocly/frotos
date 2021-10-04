import axios from 'axios';
import download from 'js-file-download';
import type { image } from '../../lib/types/image';
import type { IMAGE_FORMATS } from '../components/DownloadForm/DownloadForm';

export type downloadImageOptions = {
  format: typeof IMAGE_FORMATS[number];
  width: number;
  height: number;
  quality: number;
};

export async function triggerDownloadImage(
  image: image | null,
  options: downloadImageOptions
): Promise<void> {
  const response = await axios.post(
    '/api/images/download',
    {
      image,
      options,
    },
    { responseType: 'blob' }
  );

  if (response.status === 200) {
    download(response.data, `image.${options.format}`);
  }
}
