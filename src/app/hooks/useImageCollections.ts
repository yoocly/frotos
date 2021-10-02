import axios from 'axios';
import { useQuery } from 'react-query';
import type { dbCollection } from '../../lib/types/collection';
import type { image } from '../../lib/types/image';

export default function useImageCollections(
  image: image | null,
  userCollections: dbCollection[] | null
): dbCollection[] | null {
  const imageData = useQuery(['image', image?.id], () => getImage(image?.id || ''), {
    retry: false,
    enabled: !!image,
  });
  const imageCollections = imageData.data?.data.result.collectionsList as dbCollection[];

  const collections = userCollections?.map((collection) => ({
    ...collection,
    hasSelectedImage: imageCollections?.some(
      (imageCollection) => imageCollection._id === collection._id
    ),
  }));

  return collections || null;
}

async function getImage(imageId: string) {
  return await axios.get(`/api/images/${imageId}`);
}
