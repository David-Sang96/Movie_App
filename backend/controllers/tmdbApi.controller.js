import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingResult = (type) => async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`
    );
    const randomResult =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomResult });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTrailerResults = (type) => async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`
    );

    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getDetailsResult = (type) => async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`
    );

    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarResults = (type) => async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`
    );
    res.json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getByCategoryResults = (type) => async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`
    );
    res.json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
