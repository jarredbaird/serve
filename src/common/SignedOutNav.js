import { NavLink } from "react-router-dom";

const SignedOutNav = () => {
  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/signin">
            signin.
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            signup.
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default SignedOutNav;
