import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email");
  const [email, setEmail] = useState(initialEmail || "");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ email, username, password });
  };

  return (
    <div className="hero-bg h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="mx-3 mt-20 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-black/60 p-8 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Sign Up
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring"
                placeholder="johndoe"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
