import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import { useAuthStore } from "./store/authUser";

function App() {
  const { authCheck, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth)
    return (
      <div className="h-screen">
        <div className="flex h-full items-center justify-center bg-black">
          <Loader className="size-10 animate-spin text-red-600" />
        </div>
      </div>
    );

  return (
    <div>
      <Outlet />
      <Footer />
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
}

export default App;
