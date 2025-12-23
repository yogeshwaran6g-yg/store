import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import {DataProvider} from "./components/context/DataContext";
import StickyCart from "./components/cart/StickyCart"
import CartDrawer from "./components/cart/CartDrawer";
function App() {
  return (
    <BrowserRouter>
      <DataProvider>
      <StickyCart />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        

        {/* 404 */}
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
