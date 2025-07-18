import { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import type { Task } from "./mockData";

/** Retorna o endpoint GraphQL como URL absoluta */
function getEndpoint() {
  if (typeof window !== "undefined") {
    // No browser usar window.location.origin para obter "http(s)://host[:porta]"
    return `${window.location.origin}/api/graphql`;
  }
  // No server, em dev, hardcode para localhost:3000
  return "http://localhost:3000/api/graphql";
}

// Instância do client com URL absoluta em ambos ambientes
export const client = new GraphQLClient(getEndpoint());

const GET_TASKS = gql`
  query GetTasks($category: String, $take: Int) {
    getTasks(category: $category, take: $take) {
      id
      title
      description
      status
      category
      createdAt
      user {
        firstName
        lastName
      }
    }
  }
`;

export async function fetchTasks(
  category?: string,
  take = 10
): Promise<Task[]> {
  const data = await client.request<{ getTasks: Task[] }>(GET_TASKS, {
    category,
    take,
  });
  return data.getTasks;
}
