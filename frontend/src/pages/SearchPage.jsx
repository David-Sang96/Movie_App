import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContentStore } from "../store/content";
import { ORIGINAL_IMG_BASE_URL } from "../ultis/constants";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/v1/search/${activeTab}/${searchTerm}`,
      );
      setResults(response.data.content);
      setSearchTerm("");
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you're searching under the right category",
        );
      } else {
        toast.error("An error occured, please try again later");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-center gap-3">
          <button
            className={`rounded px-4 py-2 transition-all duration-300 ease-in hover:bg-red-700 ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"}`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`rounded px-4 py-2 transition-all duration-300 ease-in hover:bg-red-700 ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"}`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`rounded px-4 py-2 transition-all duration-300 ease-in hover:bg-red-700 ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"}`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>
        <form
          className="mx-auto mb-8 flex max-w-2xl items-stretch gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className="w-full rounded bg-gray-800 p-2 focus:outline-none"
          />
          <button className="rounded bg-red-600 p-2 hover:bg-red-700">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;
            return (
              <div className="rounded bg-gray-800 p-3" key={result.id}>
                {activeTab === "person" ? (
                  <Link
                    // to={"/actor/" + result.name}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded md:max-h-none"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => setContentType(activeTab)}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.name || result.title}
                      className="rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.name || result.title}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
