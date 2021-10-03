import axios from 'axios';
import type { image } from '../../lib/types/image';
import download from 'js-file-download';

export type downloadImageOptions = { format: 'gif' | 'png' | 'jpg' | 'webp' | 'avif' };

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
