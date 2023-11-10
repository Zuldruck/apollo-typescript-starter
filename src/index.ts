import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import { drainWebSocketServer } from '@server/plugins';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloArmor } from '@escape.tech/graphql-armor';
import { createContext } from '@server/context';
import { getResolvers, getTypeDefs } from '@gql/index';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { MEGA_BYTE } from '@constants/size';

async function main() {
  const app = express();
  const httpServer = createServer(app);

  const [typeDefs, resolvers] = await Promise.all([getTypeDefs(), getResolvers()]);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });
  const serverCleanup = useServer({ schema, context: createContext }, wsServer);

  const armor = new ApolloArmor();
  const protection = armor.protect();

  const server = new ApolloServer({
    schema,
    ...protection,
    plugins: [
      ...protection.plugins,
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      drainWebSocketServer(serverCleanup),
      process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : {},
    ],
  });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    graphqlUploadExpress({ maxFileSize: 10 * MEGA_BYTE, maxFiles: 20 }),
    expressMiddleware(server, { context: createContext }),
  );

  await new Promise((resolve) => {
    httpServer.listen({ port: process.env.PORT }, resolve as () => void);
  });

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at: http://localhost:${process.env.PORT}/graphql`);
}

main();
