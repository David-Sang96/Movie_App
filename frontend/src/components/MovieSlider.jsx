import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useContentStore } from "../store/content";
import { SMALL_IMG_BASE_URL } from "../ultis/constants";

/* eslint-disable react/prop-types */
const MovieSlider = ({ category }) => {
  const [content, setContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(response.data.content);
    };
    getContent();
  }, [contentType, category]);

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="group relative px-5 text-white md:px-20">
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px]"
            key={item.id}
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={`${SMALL_IMG_BASE_URL}${item.backdrop_path}`}
                alt="Movie Image"
                className="transition-all duration-300 ease-in-out hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      <button
        className="absolute left-5 top-24 rounded-full bg-black bg-opacity-50 p-3 transition-all duration-300 ease-in-out group-hover:opacity-100 md:left-24 md:opacity-0 md:hover:bg-opacity-75"
        onClick={scrollLeft}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-5 top-24 rounded-full bg-black bg-opacity-50 p-3 transition-all duration-300 ease-in-out group-hover:opacity-100 md:right-24 md:opacity-0 md:hover:bg-opacity-75"
        onClick={scrollRight}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default MovieSlider;
