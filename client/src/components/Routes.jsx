import Home from "@/pages/Home";
// import Login from "@/pages/Login";
import ProductScreen from "@/components/product/ProductScreen";
import Auth from "@/pages/Auth";

// User Components
import Dashboard from "@/components/user/dashboard";
import MyOrders from "@/components/user/my-orders";
import MyAccount from "@/components/user/my-account";
import UpdateProfile from "@/components/user/update-profile";
import ChangePassword from "@/components/user/change-password";
import AddShippingAddress from "@/components/user/add-shipping-address";
import CashfreeCheckout from "@pages/CashfreeCheckout";
import PaymentStatus from "@/pages/PaymentStatus";
import Checkout from "@/components/Checkout/Checkout";
import OrderDetails from "@/components/order/OrderDetails";

export const routes = [
  {
    path: "/user/order/:id",
    element: OrderDetails,
    layout: { header: true, footer: true },
    protected: true,
  },
  {
    path: "/checkout",
    element: Checkout,
    layout: { 
      header: true, 
      footer: true 
    },
    protected: true,
  },
  
  {
    path: "/",
    element: Home,
    layout: {
      header: true,
      footer: true,
    },
    protected: false,
  },
  {
    path: "/product/:slug",
    element: ProductScreen,
    layout: {
      header: true,
      footer: true,
    },
    protected: false,
  },
  {
    path: "/auth/:path",
    element: Auth,
    layout: {
      header: false,
      footer: false,
    },
    protected: false,
  },
  {
    path: "/auth/:path/:token",
    element: Auth,
    layout: {
      header: false,
      footer: false,
    },
    protected: false,
  },
  {
    path: "/user/dashboard",
    element: Dashboard,
    layout: { header: true, footer: true },
    protected: true,
  },
  {
    path: "/user/my-orders",
    element: MyOrders,
    layout: { header: true, footer: true },
    protected: true,
  },
  {
    path: "/user/my-account",
    element: MyAccount,
    layout: { header: true, footer: true },
    protected: true,
  },
  // {
  //   path: "/user/update-profile",
  //   element: UpdateProfile,
  //   layout: { header: true, footer: true },
  //   protected: true,
  // },
  {
    path: "/user/change-password",
    element: ChangePassword,
    layout: { header: true, footer: true },
    protected: true,
  },
  {
    path: "/user/add-shipping-address",
    element: AddShippingAddress,
    layout: { header: true, footer: true },
    protected: true,
  },
  {
    path: "/createSession/:orderId",
    element: CashfreeCheckout,
    layout: { header: true, footer: true },
  },
  {
    path: "/payment/status",
    element: PaymentStatus,
    layout: { header: true, footer: true },
    protected: true,
  },
];
