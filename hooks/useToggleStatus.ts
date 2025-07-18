import { useState } from "react";
import { client } from "@/lib/graphql/client";
import { gql } from "graphql-tag";
import type { Task } from "@/lib/graphql/mockData";

const UPDATE_STATUS = gql`
  mutation UpdateTaskStatus($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
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

export function useToggleStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleStatus(
    id: string,
    currentStatus: Task["status"]
  ): Promise<Task> {
    setIsLoading(true);
    setError(null);
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      const { updateTaskStatus } = await client.request<{
        updateTaskStatus: Task;
      }>(UPDATE_STATUS, { id, status: newStatus });
      return updateTaskStatus;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return { toggleStatus, isLoading, error };
}
