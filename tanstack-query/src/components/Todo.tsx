import { useIsFetching } from "@tanstack/react-query";
import { useTodoIds, useTodos } from "../services/queries";
import { useCreateTodo } from "../services/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

const Todo = () => {
  const { isPending, error, data, fetchStatus, status } = useTodoIds();
  const globalFetchingCount = useIsFetching();

  const todosQueries = useTodos(data);

  // if (isPending) {
  //   return <span>loading...</span>;
  // }
  // if (error) {
  //   return <span>An error occured!!</span>;
  // }

  const { register, handleSubmit } = useForm<Todo>();

  const { isPending: createPending, mutate } = useCreateTodo();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (todo) => {
    mutate(todo);
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
        {/* {data?.map((id) => (
          <p key={id}>{id}</p>
        ))} */}
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
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Todo;
