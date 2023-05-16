import "./styles/app.css";
import SaeRoutes from "./routers/SaeRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter basename="/sae">
        <SaeRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
