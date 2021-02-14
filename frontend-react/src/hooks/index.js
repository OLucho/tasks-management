import { AuthProvider } from "./auth";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
