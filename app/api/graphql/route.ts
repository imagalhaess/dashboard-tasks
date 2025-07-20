import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/lib/graphql/typeDefs";
import { resolvers } from "@/lib/graphql/resolvers";

// Cria o servidor Apollo, passando no schema (typeDefs) e a lógica (resolvers)
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Cria os handlers para as requisições GET e POST que o Next.js vai usar
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
