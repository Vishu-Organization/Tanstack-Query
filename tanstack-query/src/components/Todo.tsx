import { useIsFetching } from "@tanstack/react-query";
import { useTodoIds, useTodos } from "../services/queries";

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
  return (
    <>
      <div style={{ paddingLeft: "2rem" }}>
        <p>Query function status: {fetchStatus}</p>
        <p>Query data status: {status}</p>
        <p>Global Fetching Count: {globalFetchingCount}</p>
        {data?.map((id) => (
          <p key={id}>{id}</p>
        ))}
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
