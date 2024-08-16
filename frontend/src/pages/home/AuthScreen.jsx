import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="hero-bg">
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

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* first section */}
      <div className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:flex-row md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>

          {/* right side */}
          <div className="relative flex-1">
            <img src="/tv.png" alt="Tv image" className="relative z-20 mt-4" />
            <video
              className="absolute left-1/2 top-1/2 z-10 h-1/2 -translate-x-1/2 -translate-y-1/2"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* second section */}
      <div className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center px-4 md:flex-row md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger things image"
                className="mt-4"
              />
              <div className="absolute bottom-5 left-1/2 flex h-24 w-3/4 -translate-x-1/2 items-center gap-2 rounded-md border border-slate-500 bg-black px-2 lg:w-1/2">
                <img
                  src="/stranger-things-sm.png"
                  alt=" image"
                  className="h-full"
                />
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col gap-0">
                    <span className="text-md font-bold lg:text-lg">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img src="download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-balance text-4xl font-extrabold md:text-5xl">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* third section */}
      <div className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:flex-row md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, table, laptop,
              and TV.
            </p>
          </div>

          {/* right side */}
          <div className="relative flex-1">
            <img
              src="/device-pile.png"
              alt="Device image"
              className="relative z-20 mt-4"
            />
            <video
              className="absolute left-1/2 top-2 z-10 h-4/5 max-w-[63%] -translate-x-1/2"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* fourth section */}
      <div className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center px-4 md:flex-row md:px-2">
          {/* left side */}
          <div className="flex-1">
            <img src="/kids.png" alt="kids image" className="mt-4" />
          </div>

          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-balance text-4xl font-extrabold md:text-5xl">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
    </div>
  );
};

export default AuthScreen;
