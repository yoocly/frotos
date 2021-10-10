import type { dbCollection } from '../../lib/types/collection';
import axios from 'axios';
import { useQuery } from 'react-query';
import type { backendResponse } from '../../utils/responses';

export default function useCollections(currentUser: string | null): dbCollection[] | null {
  const collections = useQuery('collections', () => getCollections(), {
    retry: false,
    enabled: !!currentUser,
  });

  return collections.data?.data.result || null;
}

async function getCollections() {
  return await axios.get<backendResponse<dbCollection[], undefined>>('/api/collections');
}
