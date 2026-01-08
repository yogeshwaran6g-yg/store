import Orders from "../pages/OrderDashboard";
import Payments from "../pages/PaymentDashboard";
import Users from "../pages/UserDashboard";
import Login from "../pages/Login";
import DetailDashboard from "../pages/DetailsDashboard";
import ProductDashboard from "../pages/ProductDashboard";
import { Navigate } from "react-router-dom";


export const routes = [
  {
    path: "/login",
    element: Login,
    protected: false,
    layout: false
  },
  {
    path: "/details/:id",
    element: DetailDashboard,
    protected: true,
    layout: true
  },
  {
    path: "/orders",
    element: Orders,
    protected: true,
    layout: true
  },
  
  {
    path: "/users",
    element: Users,
    protected: true,
    layout: true
  },

  {
    path: "/payment/:id?",
    element: Payments,
    protected: true,
    layout: true
  },
  {
    path: "/products",
    element: ProductDashboard,
    protected: true,
    layout: true
  }
];
