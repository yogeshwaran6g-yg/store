import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/context/AuthContext";
import {CartProvider} from "./components/context/CartContext";
import { ShippingProvider } from "./components/context/ShippingContext";
import { ProductProvider } from "./components/context/ProductContext";
import {routes} from "./components/Routes";
import Layout from "./components/Layout";
import CartDrawer from "./components/cart/CartDrawer"
import { SidebarProvider } from "./components/context/SidebarContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CashfreeCheckout from "././pages/CashfreeCheckout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { OrderProvider } from "./components/context/OrderContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ToastContainer />
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <ShippingProvider>
            <OrderProvider>        
            <CartDrawer/>
            <SidebarProvider>
              <Routes>
                 {routes.map(({ path, element: Page, layout }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        path.startsWith("/user/") ? (
                          <ProtectedRoute>
                            <Layout header={layout.header} footer={layout.footer}>
                              <Page />
                            </Layout>
                          </ProtectedRoute>
                        ) : (
                          <Layout header={layout.header} footer={layout.footer}>
                            <Page />
                          </Layout>
                        )
                      }
                    />
                  ))}
                 <Route
  path="/createSession/:orderId"
  element={
    <ProtectedRoute>

        <CashfreeCheckout />    </ProtectedRoute>
  }
/>

              </Routes>
              </SidebarProvider>
            </OrderProvider>
            </ShippingProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
