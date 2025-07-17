import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/lib/graphql/typeDefs";
import { resolvers } from "@/lib/graphql/resolvers";

// 1. Instancia o servidor Apollo com seu schema e lógica
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 2. Cria um handler compatível com Next.js App Router
const handler = startServerAndCreateNextHandler(server);

// 3. Desabilita o bodyParser nativo do Next (o Apollo faz o parsing)
export const config = {
  api: {
    bodyParser: false,
  },
};

// 4. Exporta GET e POST para atender consultas e permitir Playground

export const GET = handler;
export const POST = handler;
