import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const HomeScreen = () => {
  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        <img
          src="/extraction.jpg"
          alt="Hero Image"
          className="absolute left-0 top-0 -z-50 size-full object-cover"
        />
        <div
          className="absolute left-0 top-0 -z-50 size-full bg-black/50"
          aria-hidden="true"
        />
        <div
          className="absolute left-0 top-0 size-full bg-gradient-to-b from-black via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="absolute left-0 top-0 flex size-full flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="max-w-2xl">
            <h1 className="mt-4 text-balance text-6xl font-extrabold">
              Extraction
            </h1>
            <p className="mt-2 text-lg">2014 | 18+</p>
            <p className="mt-4 text-lg">
              Chris Hemsworth stars in this nonstop action-thriller with
              Rudhraksh Jaiswal, Randeep Hooda and Golshifeth Farahani.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <Link
              to={"/watch/123"}
              className="flex items-center gap-2 rounded bg-white px-4 py-2 font-bold text-black hover:bg-white/80"
            >
              <Play className="size-6 fill-black" />
              Play
            </Link>
            <Link
              to={"/watch/123"}
              className="flex items-center gap-2 rounded bg-gray-500/70 px-4 py-2 text-white hover:bg-gray-500"
            >
              <Info className="size-6" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
