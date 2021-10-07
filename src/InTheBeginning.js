import react from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar.js";
import Routes from "./Routes.js";

const InTheBeginning = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default InTheBeginning;
