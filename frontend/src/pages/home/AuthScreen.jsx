import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="hero-bg relative">
      {/* Navbar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="Netflix Logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="rounded bg-red-600 px-2 py-1 text-white">
          Sign In
        </Link>
      </header>
      {/*  hero section */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center py-40 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="mb-4 text-lg">Watch anywhere.Cancel anytime.</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form className="flex w-1/2 flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 rounded border border-gray-700 bg-black/75 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="flex items-center justify-center rounded bg-red-600 px-2 py-1 text-xl md:py-2 lg:px-6 lg:text-2xl">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
