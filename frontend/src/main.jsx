import React from 'react'
import ReactDOM from 'react-dom/client'
import router from "./router";
import './index.css'
import { RouterProvider } from "react-router-dom";
import UserProvider from "../src/context/UserContext";

import SidebarProvider from "../src/context/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SidebarProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SidebarProvider>
  </React.StrictMode>
);
