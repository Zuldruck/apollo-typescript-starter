import { loadFiles } from '@graphql-tools/load-files';

export const getResolvers = async () => loadFiles(`${__dirname}/**/resolvers.ts`);
export const getTypeDefs = async () => loadFiles(`${__dirname}/**/*.graphql`);
