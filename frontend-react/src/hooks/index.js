import { AuthProvider } from "./auth";
import { TasksProvider } from "./tasks";

export default function Providers({ children }) {
  return (
    <TasksProvider>
      <AuthProvider>{children}</AuthProvider>
    </TasksProvider>
  );
}
