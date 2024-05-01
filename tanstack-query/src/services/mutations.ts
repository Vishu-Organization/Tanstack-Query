import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log("mutating");
    },
    onError: () => {
      console.log("error");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
    onSuccess: () => {
      console.log("success");
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSettled: async (data, error, variables, context) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }],
        });
      }
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      console.log("deleted successfully");
    },
    onSettled: async (data, error, variables, context) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
};
