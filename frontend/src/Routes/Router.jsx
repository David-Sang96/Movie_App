import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";

const Routers = () => {
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
          element: <LoginPage />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
