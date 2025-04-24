import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as moviesLoader } from "./pages/Home";
import MovieDetails, { loader as detailsLoader } from "./pages/MovieDetails";
import AppLayout from "./pages/AppLayout";
import Error from "./components/Error";
import Cart, {
  loader as cartLoader,
  action as createBookingAction,
} from "./pages/Cart";
import Login, { action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";
import NewMovie, { action as NewMovieAction } from "./pages/NewMovie";
import BookingReference, {
  loader as bookingReferenceLoader,
} from "./pages/BookingReference";

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
        path: "/movie/:movieId",
        element: <MovieDetails />,
        loader: detailsLoader,
        errorElement: <Error />,
      },
      {
        path: "/booking",
        element: <Cart />,
        loader: cartLoader,
        action: createBookingAction,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: signupAction,
      },
      {
        path: "/newMovie",
        element: <NewMovie />,
        action: NewMovieAction,
      },
      {
        path: "/booking/:bookingReference",
        element: <BookingReference />,
        loader: bookingReferenceLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
