import express from "express";

const router = express.Router();

import {
  getByCategoryResults,
  getDetailsResult,
  getSimilarResults,
  getTrailerResults,
  getTrendingResult,
} from "../controllers/tmdbApi.controller.js";

router.get("/trending", getTrendingResult("tv"));
router.get("/:id/trailers", getTrailerResults("tv"));
router.get("/:id/details", getDetailsResult("tv"));
router.get("/:id/similar", getSimilarResults("tv"));
router.get("/:category", getByCategoryResults("tv"));

export default router;
