import axios from 'axios';
import { useQuery } from 'react-query';

export default function useExistsUser(username: string): boolean | null {
  const userExists = useQuery(['checkUser', username], () => checkUser(username), {
    retry: false,
    enabled: !!username,
  });

  if (userExists.status === 'success') return true;
  if (userExists.status === 'error') return false;
  return null;
}

async function checkUser(username: string) {
  return await axios.post('/api/user/check', {
    user: {
      username,
    },
  });
}
