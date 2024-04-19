import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./src/routes/NotFound";
import SignIn from "./src/routes/SignIn";
import SignUp from "./src/routes/SignUp";
import MainLayout from "./src/routes/MainLayout";
import DogsTable from "./src/components/DogsTable";
import Profile from "./src/components/Profile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <DogsTable />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
  {
    path: "login",
    element: <SignIn />
  },
  {
    path: "register",
    element: <SignUp />
  }
]);

export default Router;
