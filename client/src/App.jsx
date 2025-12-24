import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CartProvider} from "./components/context/CartContext";
import { ShippingProvider } from "./components/context/ShippingContext";
import {routes} from "./components/Routes";
import Layout from "./components/Layout";
import CartDrawer from "./components/cart/CartDrawer"

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <ShippingProvider>        
      <CartDrawer/>
        <Routes>
           {routes.map(({ path, element: Page, layout }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Layout
                    header={layout.header}
                    footer={layout.footer}
                  >
                    <Page />
                  </Layout>
                }
              />
            ))}
        </Routes>
        
      </ShippingProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
