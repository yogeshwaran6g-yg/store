import Home from "@/pages/Home";
// import Login from "@/pages/Login";
import ProductScreen from "@/components/product/ProductScreen";
// import Checkout from "@/pages/Checkout";

export const routes = [
  {
    path: "/",
    element: Home,
    layout: {
      header: true,
      footer: true,
    },
  },
  {
    path: "/product/:slug",
    element: ProductScreen,
    layout: {
      header: true,
      footer: true,
    },
  },
//   {
//     path: "/checkout",
//     element: Checkout,
//     layout: {
//       header: false,
//       footer: false,
//     },
//   },
//   {
//     path: "/login",
//     element: Login,
//     layout: {
//       header: false,
//       footer: false,
//     },
//   },
];
