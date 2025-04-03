import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as moviesLoader } from "./pages/Home";
import Movie from "./pages/Movie";
import AppLayout from "./pages/AppLayout";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: moviesLoader,
        errorElement: <Error />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
        errorElement: <Error />,
      },
      {
        path: "/booking",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
