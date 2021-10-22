import NavBar from "./common/NavBar";
import { DataProvider } from "./contexts/DataContext";
import Routes from "./routes/Routes";

const InTheBeginning = () => {
  return (
    <div>
      <NavBar />
      <DataProvider>
        <Routes />
      </DataProvider>
    </div>
  );
};

export default InTheBeginning;
