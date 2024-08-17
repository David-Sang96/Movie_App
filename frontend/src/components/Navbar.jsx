import { LogOut, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useAuthStore();
  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const mobileClickFunc = (type) => {
    toggleMobileMenu();
    setContentType(type);
  };

  return (
    <header className="mx-auto flex h-20 max-w-6xl flex-wrap items-center justify-between p-4">
      <div className="z-50 flex items-center gap-10">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* desktop navbar items */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="z-50 flex items-center gap-2">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="profile image"
          className="h-8 cursor-pointer rounded"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logOut} />
        <div className="sm:hidden">
          {isMobileMenuOpen ? (
            <X className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
          ) : (
            <Menu
              className="size-6 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          )}
        </div>
      </div>

      {/* mobile navbar items */}
      <div
        className={`absolute z-30 mt-5 transition-all duration-500 ease-in-out sm:hidden ${isMobileMenuOpen ? "top-14" : "top-[-490px]"}`}
      >
        {/* <Link to={"/"} className="block p-2" onClick={toggleMobileMenu}>
          <span className="relative inline-block hover:underline">
            <span className="relative z-40 text-white">Movies</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="absolute size-11 bg-red-300 opacity-70 blur-lg"></span>
            </span>
          </span>
        </Link> */}
        <Link
          to={"/"}
          className="block p-2 hover:underline"
          onClick={() => mobileClickFunc("movie")}
        >
          Movies
        </Link>
        <Link
          to={"/"}
          className="block p-2 hover:underline"
          onClick={() => mobileClickFunc("tv")}
        >
          Tv Shows
        </Link>
        <Link
          to={"/"}
          className="block p-2 hover:underline"
          onClick={() => mobileClickFunc()}
        >
          Search History
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
