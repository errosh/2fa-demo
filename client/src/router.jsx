import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "./pages/Login";
import OtpAuth from "./pages/OtpAuth";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Login/>,
    },
    {
      path: "/register",
      element:<Register/>,
    },
    {
      path: "/auth/2fa",
      element:<OtpAuth />,
    },
    {
      path: "/dashboard",
      element:<Dashboard />,
    },

   
  ]);

  export default router;