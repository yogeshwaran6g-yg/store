import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./components/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarLayout from "./components/SidebarLayout";
import { Navigate } from "react-router-dom";
import { DataContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Modal from "react-modal";

const withLayout = (Page, layout) =>
  layout ? (
    <SidebarLayout>
      <Page />
    </SidebarLayout>
  ) : (
    <Page />
  );

function App() {
  const queryClient = new QueryClient();
  Modal.setAppElement("#root");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DataContextProvider>
          <BrowserRouter>
            <ToastContainer />
            <Routes>
              {routes.map(
                ({ path, element: Page, layout, protected: isProtected }) => {
                  const content = withLayout(Page, layout);
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={
                        isProtected ? (
                          <ProtectedRoute>{content}</ProtectedRoute>
                        ) : (
                          content
                        )
                      }
                    />
                  );
                }
              )}

              <Route path="" element={<Navigate to="/orders" replace />} />
            </Routes>
          </BrowserRouter>
        </DataContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
