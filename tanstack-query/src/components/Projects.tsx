import { useState } from "react";
import { useProjects } from "../services/queries";

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, isFetching } =
    useProjects(page);

  return (
    <div>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <div>Current Page: {page}</div>
      <button onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 0))}>
        Previous page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((oldPage) => oldPage + 1);
          }
        }}
        disabled={isPlaceholderData}>
        Next page
      </button>
      {isFetching ? <span>Loading...</span> : null}
    </div>
  );
};

export default Projects;
