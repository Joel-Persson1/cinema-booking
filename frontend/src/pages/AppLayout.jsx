import { Outlet, useNavigation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div>
      {isLoading && <Loader />}

      <Navbar />

      <main>
        <Toaster position="top-center" />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
