import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Register /> },

]);

export default router;
