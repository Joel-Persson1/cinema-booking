import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../helpers/handleLogout.js";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("http://localhost:3000/auth/whoami", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, [location]);

  const onLogoutClick = () => {
    handleLogout(navigate, setUser);
  };

  return (
    <nav>
      {user ? (
        <button onClick={onLogoutClick}>Logout</button>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
