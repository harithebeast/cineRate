const Review = require('../models/reviewModel'); // Import the Review model

// Controller for adding a new review
exports.addReview = async (req, res) => {
  const { movieId, email, rating, review } = req.body;

  try {
    // Create a new review instance
    const newReview = new Review({
      movieId,
      email,  // Use email instead of userId
      rating,
      review,
    });

    // Save the review to the database
    await newReview.save();

    // Return the saved review in the response
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

// Controller for fetching reviews of a movie by movieId
exports.getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    // Find all reviews for the movie with the given movieId
    const reviews = await Review.find({ movieId })
      .sort({ createdAt: -1 }); // Sort reviews by creation date in descending order

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this movie" });
    }

    // Return the reviews
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

// Controller for updating a review (optional)
exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, review } = req.body;

  try {
    // Find and update the review by its ID
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, review, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Return the updated review
    res.status(200).json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating review", error: error.message });
  }
};

// Controller for deleting a review (optional)
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    // Find and delete the review by its ID
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Return a success message
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
};
