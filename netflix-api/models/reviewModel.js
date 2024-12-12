const mongoose = require('mongoose');

// Define the Review Schema
const reviewSchema = new mongoose.Schema({
  movieId: {
    type: String, // Store TMDb movie ID (String format)
    required: true,
  },
  email: {
    type: String, // Store the email of the user submitting the review
    required: true,
    trim: true,  // Ensure no extra spaces around the email
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Rating range from 1
    max: 5, // Rating range to 5
  },
  review: {
    type: String,
    required: true,
    maxlength: 1000, // Limit the length of reviews
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
