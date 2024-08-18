/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const Custom404Page = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center text-wrap bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="absolute left-0 top-0 w-full bg-black p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix" className="h-8" />
        </Link>
      </header>
      <main className="error-page--content z-10 text-center">
        <h1 className="mb-6 text-7xl font-semibold"> Lost your way?</h1>
        <p className="mb-8 text-xl">
          Sorry, we can't find that page.You'll find lots to explore on the home
          page.
        </p>
        <Link
          to={"/"}
          className="rounded bg-white px-4 py-2 text-lg font-medium text-black"
        >
          Netflix Home
        </Link>
      </main>
    </div>
  );
};

export default Custom404Page;
