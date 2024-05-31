import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-activity/dist/library.css";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./app/routes";
import { AuthProvider } from "./context/auth-context";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
};
