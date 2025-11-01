// import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import NewAccount from "@/pages/NewAccount";
import Cards from "@/pages/Cards";
import FundTransfer from "@/pages/FundTransfer";
import Transactions from "@/pages/Transactions";
import Profile from "@/pages/Profile";
import About from "@/pages/About";
import Incidents from "@/pages/Incidents";
import Customers from "@/pages/Customers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout (Navbar/Sidebar + <Outlet />)
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // ✅ All protected routes go here
      {
        element: <ProtectedRoute />, // <-- your Outlet-based guard
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "accounts", element: <Accounts /> },
          { path: "newaccount", element: <NewAccount /> },
          { path: "card", element: <Cards /> },
          { path: "fundtransfer", element: <FundTransfer /> },
          { path: "transactions", element: <Transactions /> },
          { path: "profile", element: <Profile /> },
          { path: "about", element: <About /> },
          { path: "incidents", element: <Incidents /> },
          { path: "customers", element: <Customers /> },
        ],
      },

      // public
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
