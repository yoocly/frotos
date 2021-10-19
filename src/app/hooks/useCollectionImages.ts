import type { DbCollection } from '../../lib/types/collection';
import axios from 'axios';
import { useQuery } from 'react-query';
import type { backendResponse } from '../../utils/responses';
import type { ImagesResult } from '../../lib/types/image';

export default function useCollectionImages(collectionId: string | null): ImagesResult | null {
  const collectionImages = useQuery(
    ['collectionImages', collectionId],
    () => getCollectionImages(collectionId || ''),
    {
      retry: false,
      enabled: !!collectionId,
    }
  );
  const results = collectionImages.data?.data.result?.imagesList || [];
  return { count: results.length, results: results.map((result) => result.image) };
}

async function getCollectionImages(collectionId: string) {
  return await axios.get<backendResponse<DbCollection, undefined>>(
    `/api/collections/${collectionId}`
  );
}
