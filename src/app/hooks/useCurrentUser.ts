import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import type { User } from '../../lib/types/user';

export default function useCurrentUser(): string | null {
  try {
    const user = jwtDecode(cookies.get('auth') || '') as User;
    const remainingTime = user.exp ? user.exp - Math.floor(Date.now() / 1000) : 0;
    return remainingTime > 0 && user.username ? user.username : null;
  } catch {
    return null;
  }
}
