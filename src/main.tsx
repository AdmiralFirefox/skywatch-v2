import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Home.tsx";
import Search from "./routes/search.tsx";
import SearchHistory from "./routes/search_history.tsx";
import Bookmarking from "./routes/bookmarking.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import "./styles/globals.scss";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: (
      <AuthProvider>
        <Search />
      </AuthProvider>
    ),
  },
  {
    path: "/search_history",
    element: (
      <AuthProvider>
        <SearchHistory />
      </AuthProvider>
    ),
  },
  {
    path: "/bookmarking",
    element: (
      <AuthProvider>
        <Bookmarking />
      </AuthProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
