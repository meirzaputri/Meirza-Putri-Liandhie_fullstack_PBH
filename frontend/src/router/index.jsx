import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";


const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard/Home"));
const Transaction = lazy(() => import("../pages/Transactions/Transaction"));
const Report = lazy(() => import("../pages/Report/Report"));
const AppLayout = lazy(() => import("../layout/AppLayout"));

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Register /> },
  {
    path: "/apps",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "transactions", element: <Transaction /> },
      { path: "reports", element: <Report /> },
    ]
  }
]);

export default router;
