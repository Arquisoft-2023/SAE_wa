import "./styles/app.css";
import SaeRoutes from "./routes/SaeRoutes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <SaeRoutes />
      </SnackbarProvider>
    </>
  );
}

export default App;
