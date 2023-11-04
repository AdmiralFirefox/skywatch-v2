import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import { QueryProvider } from "./provider/QueryProvider.tsx";
import Home from "./Home.tsx";
import Search from "./routes/search.tsx";
import SearchHistory from "./routes/search_history.tsx";
import Bookmarking from "./routes/bookmarking.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import "swiper/css";
import "swiper/css/navigation";
import "./styles/globals.scss";
import "./styles/fonts.scss";

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
    <AuthProvider>
      <QueryProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryProvider>
    </AuthProvider>
  </React.StrictMode>
);
