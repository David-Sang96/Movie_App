import express from "express";

const router = express.Router();

import {
  getByCategoryResults,
  getDetailsResult,
  getSimilarResults,
  getTrailerResults,
  getTrendingResult,
} from "../controllers/tmdbApi.controller.js";

router.get("/trending", getTrendingResult("movie"));
router.get("/:id/trailers", getTrailerResults("movie"));
router.get("/:id/details", getDetailsResult("movie"));
router.get("/:id/similar", getSimilarResults("movie"));
router.get("/:category", getByCategoryResults("movie"));

export default router;
