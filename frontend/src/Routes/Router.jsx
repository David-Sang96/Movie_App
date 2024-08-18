import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import Custom404Page from "../pages/Custom404Page";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/LoginPage";
import SearchHistoryPage from "../pages/SearchHistoryPage";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/SignUp";
import WatchPage from "../pages/WatchPage";
import { useAuthStore } from "../store/authUser";

const Routers = () => {
  const { user } = useAuthStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/login",
          element: !user ? <LoginPage /> : <Navigate to={"/"} replace />,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUp /> : <Navigate to={"/"} replace />,
        },
        {
          path: "/watch/:id",
          element: user ? <WatchPage /> : <Navigate to={"/login"} replace />,
        },
        {
          path: "/search",
          element: user ? <SearchPage /> : <Navigate to={"/login"} replace />,
        },
        {
          path: "/history",
          element: user ? (
            <SearchHistoryPage />
          ) : (
            <Navigate to={"/login"} replace />
          ),
        },
        {
          path: "*",
          element: <Custom404Page />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
