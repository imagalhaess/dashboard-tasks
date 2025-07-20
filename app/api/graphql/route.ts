import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/lib/graphql/typeDefs";
import { resolvers } from "@/lib/graphql/resolvers";
import { NextRequest } from "next/server";

/*
  Criação da instância do ApolloServer.
  Esta parte continua igual, instanciando o servidor com o schema (typeDefs)
  e a lógica de busca de dados (resolvers).
*/
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/*
  Geração do handler genérico.
  Esta função da biblioteca de integração cria um handler que sabe como
  processar requisições GraphQL. Não o exportamos diretamente para evitar
  conflitos de tipo com o Next.js.
*/
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

/*
  Exportação explícita da função GET.
  Esta é a correção principal: criar uma função `GET` com a assinatura exata
  que o Next.js App Router espera para uma rota de API: (request).
  Isso resolve o erro de tipo que ocorria durante o build.
*/
export async function GET(request: NextRequest) {
  return handler(request);
}

/*
  Exportação explícita da função POST.
  Faz o mesmo para o método POST, garantindo a assinatura correta e
  a compatibilidade com o Next.js.
*/
export async function POST(request: NextRequest) {
  return handler(request);
}
