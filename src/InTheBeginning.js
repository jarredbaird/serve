import NavBar from "./common/NavBar";
import Routes from "./routes/Routes";

const InTheBeginning = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes />
      </div>
    </div>
  );
};

export default InTheBeginning;
