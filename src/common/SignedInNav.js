import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const SignedInNav = () => {
  const { setCurrentUser, setToken } = useContext(UserContext);
  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/event-templates/create">
            set up event template.
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            aria-current="page"
            to="/event-templates/schedule">
            schedule event template.
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            aria-current="page"
            to="/event-templates/view">
            see event templates.
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/users/qualify">
            skill up a user.
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            aria-current="page"
            to="/signin"
            onClick={() => {
              setCurrentUser(null);
              setToken(null);
            }}>
            signout.
          </Link>
        </li>
      </ul>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SignedInNav;
