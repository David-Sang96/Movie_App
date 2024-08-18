/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn({ email, password });
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('/hero.png')`,
      }}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="mx-3 mt-20 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-black/60 p-8 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Log In
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring"
                placeholder="*******"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full rounded-md bg-red-600 py-2 font-semibold text-white hover:bg-red-700"
              type="submit"
            >
              LogIn
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to={"/sign-up"} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
