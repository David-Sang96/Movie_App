import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMovieTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
