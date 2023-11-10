import { User } from '@server/models';

export interface Context {
  user: User | null;
}

export async function createContext() {
  return {
    user: await User.findOne(),
  };
}
