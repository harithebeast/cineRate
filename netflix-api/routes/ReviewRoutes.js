const express = require('express');
const router = express.Router();
const { addReview, getReviewsByMovie, updateReview, deleteReview } = require('../controllers/ReviewController');

// Route to add a review
// POST /api/review
router.post('/review', addReview);

// Route to get reviews for a movie by movieId
// GET /api/reviews/:movieId
router.get('/review/:movieId', getReviewsByMovie);

// Route to update a review by reviewId
// PUT /api/review/:reviewId
router.put('/review/:reviewId', updateReview);

// Route to delete a review by reviewId
// DELETE /api/review/:reviewId
router.delete('/review/:reviewId', deleteReview);

module.exports = router;
