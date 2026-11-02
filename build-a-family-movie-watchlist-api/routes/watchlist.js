import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

const router = express.Router();

router.use(authenticate);

router.get("/:userId", (req, res) => {
  const list = getWatchlist(Number(req.params.userId));
  if (list === null) {
    return res.status(404).json({ error: "User not found." });
  }
  res.status(200).json(list);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
  const movie = addMovie(Number(req.params.userId), req.body || {});
  if (!movie) {
    return res.status(404).json({ error: "User not found." });
  }
  res.status(201).json(movie);
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const movie = updateMovie(
    Number(req.params.userId),
    Number(req.params.movieId),
    req.body || {},
  );
  if (!movie) {
    return res.status(404).json({ error: "Movie not found." });
  }
  res.status(200).json(movie);
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const removed = deleteMovie(
    Number(req.params.userId),
    Number(req.params.movieId),
  );
  if (!removed) {
    return res.status(404).json({ error: "Movie not found." });
  }
  res.status(200).json({ message: "Movie removed." });
});

export default router;
