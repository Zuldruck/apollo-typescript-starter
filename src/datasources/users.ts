import { User } from '@server/models';
import DataLoader from 'dataloader';

export default class UsersDataSource {
  private batchUsers = new DataLoader(async (ids: readonly number[]) => {
    const users = await User.findAll({ where: { id: ids } });
    const userIdToUserMap = users.reduce((mapping: Record<number, User>, user) => {
      // eslint-disable-next-line no-param-reassign
      mapping[user.id] = user;
      return mapping;
    }, {});
    return ids.map((id) => userIdToUserMap[id]);
  });

  async getUsersByIds(ids: number[]): Promise<(User | Error)[]> {
    return this.batchUsers.loadMany(ids);
  }

  async getUserById(id: number): Promise<User> {
    return this.batchUsers.load(id);
  }
}
