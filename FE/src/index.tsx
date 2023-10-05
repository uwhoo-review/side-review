import React from "react";
import {createRoot} from "react-dom/client";
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const router = createBrowserRouter(
    [
      {
        path: "/*",
        element: (
                <App />
        ),
      },
    ],
    // { basename: baseName }
);

root.render(<RouterProvider router={router} />);
