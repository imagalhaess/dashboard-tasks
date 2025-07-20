import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/lib/graphql/typeDefs";
import { resolvers } from "@/lib/graphql/resolvers";
import { NextRequest } from "next/server"; // 1. Importa o NextRequest

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 2. Atualiza a criação do handler para o formato mais moderno,
//    que resolve o problema de tipagem com as novagit add app/api/graphql/route.tss versões do Next.js.
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
