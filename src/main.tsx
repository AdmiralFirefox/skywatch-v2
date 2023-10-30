import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Home.tsx";
import Search from "./routes/search.tsx";
import SearchHistory from "./routes/search_history.tsx";
import Bookmarking from "./routes/bookmarking.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import "./styles/globals.scss";
import "./styles/fonts.scss";

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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
