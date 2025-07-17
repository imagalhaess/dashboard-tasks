import { gql } from "graphql-tag";

export const typeDefs = gql`
  # Define o tipo User, que agrupa primeiro e último nome
  type User {
    firstName: String!
    lastName: String!
  }
  # Define o tipo Task, com todos os campos que a UI vai usar
  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    category: String
    createdAt: String!
    user: User!
  }

  type Query {
    # getTasks: retorna as tarefas com filtro opcional e limite de quantidade
    getTasks(category: String, take: Int): [Task!]!
  }

  type Mutation {
    # altera o status de uma tarefa pelo ID
    updateTaskStatus(id: ID!, status: String!): Task!
  }
`;
