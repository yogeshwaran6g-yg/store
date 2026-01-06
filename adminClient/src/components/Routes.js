import Orders from "../pages/OrderDashboard";
import Payments from "../pages/PaymentDashboard";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";



export const routes = [
  {
    path: "/login",
    element: Login,
    protected: false,
    layout: false
  },
  {
    path: "/orders",
    element: Orders,
    protected: true,
    layout: true
  },

  {
    path: "/payment",
    element: Payments,
    protected: true,
    layout: true
  }
];
