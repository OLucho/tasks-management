import Routes from "./routes";
import { AuthProvider } from "././hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
