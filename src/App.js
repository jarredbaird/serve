import InTheBeginning from "./InTheBeginning.js";
import "./App.css";
import { UserProvider } from "./contexts/UserContext.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <InTheBeginning />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
