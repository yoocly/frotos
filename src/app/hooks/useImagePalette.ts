import axios from 'axios';
import { useQuery } from 'react-query';
import type { Image, ImageColors } from '../../lib/types/image';

export type imagePalette = {
  hsl: number[];
  css: string;
  complementCss: string;
  lightTextColor: boolean;
}[];

export function useImagePalette(image: Image | null): imagePalette | undefined {
  const colorsResponse = useQuery(['colors', image?.id], () => getColors(image), {
    retry: false,
    enabled: !!image,
  });

  if (colorsResponse.status !== 'success') return;
  const colors = colorsResponse.data?.data?.result as ImageColors[];

  const palette = colors.map((color) => {
    const hsl = [
      Math.round(color.hsl[0]),
      Math.round(color.hsl[1] * 100),
      Math.round(color.hsl[2] * 100),
    ];
    const complementHue = hsl[0] > 180 ? hsl[0] - 180 : hsl[0] + 180;
    return {
      hsl,
      css: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
      complementCss: `hsl(${complementHue}, ${hsl[1]}%, ${hsl[2]}%)`,
      lightTextColor: hsl[2] < 50,
    };
  });

  return palette;
}

async function getColors(image: Image | null) {
  return await axios.post('/api/images/colors', {
    image,
  });
}
