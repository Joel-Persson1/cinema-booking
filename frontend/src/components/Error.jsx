import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <Link to="/">Go Home</Link>
    </div>
  );
}

export default Error;
