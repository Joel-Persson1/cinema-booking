import { Link } from "react-router-dom";
import { handleLogout } from "../helpers/handleLogout.js";

function Navbar() {
  return (
    <header>
      <Link to="/login">Login</Link>
      <button onClick={handleLogout}>logout</button>
    </header>
  );
}

export default Navbar;
