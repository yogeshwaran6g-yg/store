import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./components/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Routes>
          {routes.map(
            ({ path, element: Page, layout, protected: isProtected }) => (
              <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <ProtectedRoute>
                      <Page />
                    </ProtectedRoute>
                  ) : (
                    <Page />
                  )
                }
              />
            )
          )}
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
