import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.tsx";
import Search from "./routes/search.tsx";
import SearchHistory from "./routes/search_history.tsx";
import Bookmarking from "./routes/bookmarking.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/search_history",
    element: <SearchHistory />,
  },
  {
    path: "/bookmarking",
    element: <Bookmarking />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
