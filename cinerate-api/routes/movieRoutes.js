const express = require("express");
const Movie = require("../models/MovieModel");  // Movie schema
const router = express.Router();

// Get movie details by movieId
router.get("/:movieId", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);  // Find movie by ID
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);  // Send movie data as response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
