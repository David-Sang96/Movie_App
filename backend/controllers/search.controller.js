import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchByCategories = (type) => async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const user = await User.findById(req.user._id).select("searchHistory");
    const resultId = response.results[0].id;

    const isAlreadyInHistory = user.searchHistory.some(
      (historyItem) => historyItem.id === resultId
    );

    if (!isAlreadyInHistory) {
      const image =
        type === "tv" || type === "movie"
          ? response.results[0].poster_path
          : response.results[0].profile_path;

      const title =
        type === "movie" ? response.results[0].title : response.results[0].name;

      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image,
            title,
            searchType: type,
            createdAt: new Date(),
          },
        },
      });
    }

    res.json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchByCategories: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSearchHistory = (req, res) => {
  try {
    res.json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in getSearchHistory: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(req.user._id, {
      // pull remove match id from array
      $pull: { searchHistory: { id: parseInt(id) } },
    });
    res.json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log("Error in removeItemFromSearchHistory: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
