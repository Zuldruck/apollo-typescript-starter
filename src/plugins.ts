import { Disposable } from 'graphql-ws';

export const drainWebSocketServer = (serverCleanup: Disposable) => ({
  async serverWillStart() {
    return {
      async drainServer() {
        await serverCleanup.dispose();
      },
    };
  },
});
