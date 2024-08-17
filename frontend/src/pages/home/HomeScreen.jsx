import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";

import { useState } from "react";
import MovieSlider from "../../components/MovieSlider";
import Navbar from "../../components/Navbar";
import useGetTrendingContent from "../../hookes/useGetTrendingContent";
import { useContentStore } from "../../store/content";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../ultis/constants";

const HomeScreen = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();

  if (!trendingContent)
    return (
      <div className="relative h-screen text-white">
        <Navbar />
        <div className="shimmer absolute left-0 top-0 -z-50 flex size-full items-center justify-center bg-black/70" />
      </div>
    );

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {/* optimization hack for images */}
        {imgLoading && (
          <div className="shimmer absolute left-0 top-0 -z-50 flex size-full items-center justify-center bg-black/70" />
        )}

        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent.backdrop_path}
          alt="Hero Image"
          className="absolute left-0 top-0 -z-50 size-full object-cover"
          onLoad={() => setImgLoading(false)}
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
              {trendingContent.title || trendingContent.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent.release_date?.split("-")[0] ||
                trendingContent.first_air_date?.split("-")[0]}{" "}
              | {trendingContent.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent.overview.length > 200
                ? trendingContent.overview.slice(0, 200) + "..."
                : trendingContent.overview}
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <Link
              to={`/watch/${trendingContent.id}`}
              className="flex items-center gap-2 rounded bg-white px-4 py-2 font-bold text-black hover:bg-white/80"
            >
              <Play className="size-6 fill-black" />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent.id}`}
              className="flex items-center gap-2 rounded bg-gray-500/70 px-4 py-2 text-white hover:bg-gray-500"
            >
              <Info className="size-6" />
              More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
