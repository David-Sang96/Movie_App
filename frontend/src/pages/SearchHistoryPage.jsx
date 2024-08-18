import axios from "axios";
import { useEffect, useState } from "react";

import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../ultis/constants";
import { formatDate } from "../ultis/dataFunction";

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await axios.get(`/api/v1/search/history`);
        setSearchHistory(response.data.content);
      } catch (error) {
        console.error(error.message);
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/search/history/${id}`);
      setSearchHistory((prev) => prev.filter((item) => item.id !== id));
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory.length === 0 || !searchHistory) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Search History</h1>
          <div className="flex h-96 items-center justify-center">
            <div className="text-xl">No Search History Found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Search History</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {searchHistory.map((entry) => (
            <div
              className="flex items-start rounded bg-gray-800 p-4"
              key={entry.id}
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History Image"
                className="mr-4 size-16 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg">{entry.title}</span>
                <span className="text-sm text-gray-400">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              <span
                className={`ml-auto min-w-20 rounded-full px-3 py-1 text-center text-sm ${entry.searchType === "movie" ? "bg-red-600" : entry.searchType === "tv" ? "bg-blue-600" : "bg-green-600"}`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                onClick={() => handleDelete(entry.id)}
                className="ml-4 size-5 cursor-pointer hover:fill-red-600 hover:text-red-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
