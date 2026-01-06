import Orders from "../pages/OrderDashboard";


export const routes = [
  
  {
    path: "/",
    element: Orders,
    // layout: { header: true, footer: true },
    protected:false
  },
];
