import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Main from "./vistas/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main />
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);