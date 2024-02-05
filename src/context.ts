import UsersDataSource from '@datasources/users';

export interface Context {
  dataSources: {
    users: UsersDataSource;
  };
}

export async function createContext() {
  return {
    dataSources: {
      users: new UsersDataSource(),
    },
  };
}
