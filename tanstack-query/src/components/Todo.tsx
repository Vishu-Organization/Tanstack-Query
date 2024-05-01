import { useIsFetching } from "@tanstack/react-query";
import { useTodoIds, useTodos } from "../services/queries";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

const Todo = () => {
  const { data, fetchStatus, status } = useTodoIds();
  const globalFetchingCount = useIsFetching();
  const todosQueries = useTodos(data);
  const { register, handleSubmit } = useForm<Todo>();
  const { isPending: createPending, mutate } = useCreateTodo();
  const {
    isPending: updatePending,
    mutate: updateMutate,
    variables: updateVariables,
  } = useUpdateTodo();
  const {
    isPending: deletePending,
    mutate: deleteMutate,
    variables: deleteVariable,
  } = useDeleteTodo();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (todo) => {
    mutate(todo);
  };

  const handleUpdateTodoSubmit = (todo: Todo | undefined) => {
    todo && updateMutate({ ...todo, checked: true });
  };
  const handleDeleteTodoSubmit = (id: number | undefined) => {
    id && deleteMutate(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New todo:</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createPending}
          value={createPending ? "Creating..." : "Create Todo"}
        />
      </form>

      <div style={{ paddingLeft: "2rem" }}>
        <p>Query function status: {fetchStatus}</p>
        <p>Query data status: {status}</p>
        <p>Global Fetching Count: {globalFetchingCount}</p>
      </div>

      <ul>
        {todosQueries.map(({ data }) => {
          return (
            <li key={data?.id}>
              <div>Id: {data?.id}</div>
              <span>
                <strong>Title:</strong> {data?.title}
                <strong>Description:</strong> {data?.description}
              </span>
              <div>
                <button
                  disabled={
                    data?.checked ||
                    (updatePending && updateVariables.id === data?.id)
                  }
                  style={{ backgroundColor: "ButtonShadow" }}
                  onClick={() => {
                    handleUpdateTodoSubmit(data);
                  }}>
                  {data?.checked ? "Done" : "Mark as Done"}
                </button>
                <button
                  disabled={deletePending && deleteVariable === data?.id}
                  style={{ backgroundColor: "ButtonShadow" }}
                  onClick={() => {
                    handleDeleteTodoSubmit(data?.id);
                  }}>
                  {deletePending && deleteVariable === data?.id
                    ? "Deleting"
                    : "Delete"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Todo;
