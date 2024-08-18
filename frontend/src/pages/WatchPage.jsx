import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { useContentStore } from "../store/content";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../ultis/constants";
import { formatReleaseDate } from "../ultis/dataFunction";

const WatchPage = () => {
  const [trailers, setTrailers] = useState([]);
  const [content, setContent] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);
  const [currentTrailersIdx, setCurrentTrailersIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/trailers`,
        );
        setTrailers(response.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [id, contentType]);

  useEffect(() => {
    const getSimilar = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similar`,
        );
        setSimilarContent(response.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      } finally {
        setLoading(false);
      }
    };

    getSimilar();
  }, [id, contentType]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`,
        );
        setContent(response.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent({});
        }
      }
    };

    getContentDetails();
  }, [id, contentType]);

  const handleNext = () => {
    if (trailers.length - 1 > currentTrailersIdx) {
      setCurrentTrailersIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrailersIdx > 0) {
      setCurrentTrailersIdx((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content || Object.keys(content).length === 0) {
    return (
      <div className="h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl">
          <Navbar />
          <div className="mx-auto mt-40 h-full px-4 py-8 text-center">
            <h2 className="text-balance text-2xl font-bold sm:text-5xl">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto h-full px-4 py-8">
        {/* trailers section */}
        {trailers.length > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <button
              className={`rounded bg-gray-500/70 px-4 py-2 text-white hover:bg-gray-500 ${currentTrailersIdx === 0 ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={currentTrailersIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`rounded bg-gray-500/70 px-4 py-2 text-white hover:bg-gray-500 ${currentTrailersIdx === trailers.length - 1 ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={currentTrailersIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="mb-8 aspect-video p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              // className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailersIdx].key}`}
            />
          )}
          {trailers.length === 0 && (
            <h2 className="mt-5 text-center text-xl">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>
              😥
            </h2>
          )}
        </div>

        {/* movie details section */}
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-20 md:flex-row">
          <div className="mb-4 md:mb-0">
            <h2 className="text-balance text-5xl font-bold">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date,
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-xl">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* similar section */}
        <div>
          {similarContent.length > 0 && (
            <div className="group relative mx-auto mt-12 max-w-5xl">
              <h3 className="mb-4 text-3xl font-bold">
                Similar Movies/TV Shows
              </h3>
              <div
                className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide"
                ref={sliderRef}
              >
                {similarContent.map((content) => {
                  if (content.poster_path === null) return null;
                  return (
                    <Link
                      key={content.id}
                      to={`/watch/${content.id}`}
                      className="w-52 flex-none"
                    >
                      <img
                        src={SMALL_IMG_BASE_URL + content.poster_path}
                        alt="Poster Image"
                        className="h-auto w-full rounded-md"
                      />
                      <h4 className="mt-2 text-lg font-semibold">
                        {content.title || content.name}
                      </h4>
                    </Link>
                  );
                })}
              </div>
              <button
                className="absolute left-2 top-44 rounded-full bg-red-600 bg-opacity-70 p-2 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
                onClick={scrollLeft}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-2 top-44 rounded-full bg-red-600 bg-opacity-70 p-2 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
                onClick={scrollRight}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
