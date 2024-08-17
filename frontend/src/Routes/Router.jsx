import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/LoginPage";
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
