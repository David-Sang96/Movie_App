import express from "express";

const router = express.Router();

import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchByCategories,
} from "../controllers/search.controller.js";

router.get("/person/:query", searchByCategories("person"));
router.get("/movie/:query", searchByCategories("movie"));
router.get("/tv/:query", searchByCategories("tv"));

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
