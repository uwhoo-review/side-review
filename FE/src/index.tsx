import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: (
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      ),
    },
  ]
  // { basename: baseName }
);

root.render(<RouterProvider router={router} />);
