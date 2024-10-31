import { auth } from '@/config/firebaseConfig';

export const getAuthToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(true);
  }
  throw new Error('No authenticated user');
};
