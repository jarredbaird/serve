import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import SignedInNav from "./SignedInNav";
import SignedOutNav from "./SignedOutNav";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-2" to="#">
          serve.
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {currentUser ? <SignedInNav /> : <SignedOutNav />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
