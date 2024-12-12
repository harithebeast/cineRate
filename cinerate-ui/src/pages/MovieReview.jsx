import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { BsArrowLeft } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MovieReview() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(1);
  const [email, setEmail] = useState("");
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9`
        );
        setMovie(movieResponse.data);

        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/review/${movieId}`);
        if (Array.isArray(reviewsResponse.data.reviews)) {
          setReviews(reviewsResponse.data.reviews);
        } else {
          throw new Error("Invalid reviews data format.");
        }

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3d39d6bfe362592e6aa293f01fbcf9b9`
        );
        setCast(castResponse.data.cast.slice(0, 10)); // Limit to top 10 cast members
      } catch (error) {
        setError("Error fetching movie details or reviews.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleReviewSubmit = async () => {
    if (!email) {
      console.log("User not authenticated. Review not submitted.");
      return;
    }

    const existingReview = reviews.find((review) => review.email === email);

    try {
      setIsLoading(true);

      let response;
      if (existingReview) {
        response = await axios.put(`http://localhost:5000/api/reviews/review/${existingReview._id}`, {
          review: newReview,
          rating: rating,
        });

        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === existingReview._id ? response.data : review
          )
        );
        console.log("Review updated successfully.");
      } else {
        response = await axios.post(`http://localhost:5000/api/reviews/review`, {
          review: newReview,
          movieId: movieId,
          rating: rating,
          email: email,
        });

        setReviews((prevReviews) => [...prevReviews, response.data]);
        console.log("Review submitted successfully.");
      }

      setNewReview("");
      setRating(1);
      window.location.reload();
    } catch (error) {
      console.log("Error submitting/updating review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div
      className="container my-4 p-4 text-white"
      style={{ backgroundColor: "black", minHeight: "100vh" }}
    >
      <div className="mb-3">
  <Link to="/" className="btn btn-outline-light">
    <BsArrowLeft /> Back
  </Link>
</div>


      <h1 className="mb-4">{movie.title}</h1>

      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Movie Poster"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <p>{movie.overview}</p>
          <h5>Cast:</h5>
          <div className="row">
  {cast.map((member) => (
    <div key={member.id} className="col-6 col-sm-4 mb-3 text-center">
      <img
        src={
          member.profile_path
            ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
            : "https://via.placeholder.com/150" // Placeholder if no image
        }
        alt={member.name}
        className="img-fluid rounded-circle"
        style={{
          width: "80px", // Adjust the width
          height: "80px", // Adjust the height
          objectFit: "cover", // Ensures the image doesn't distort
        }}
      />
      <p className="mt-2">{member.name}</p>
    </div>
  ))}
</div>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              margin: "5rem 0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                fontSize: "1.4rem",
                gap: "1rem",
                borderRadius: "0.2rem",
                padding: "0.5rem 2.4rem",
                border: "none",
                cursor: "pointer",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transition: "0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
              onClick={() => navigate(`/player?movieId=${movie.id}`)}
            >
              <FaPlay /> Play Trailer
          
            </button>

            <button
              style={{
                fontSize: "1.4rem",
                gap: "1rem",
                borderRadius: "0.2rem",
                padding: "0.5rem 2.4rem",
                border: "none",
                cursor: "pointer",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transition: "0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
              onClick={() => navigate(`/playermovie?movieId=${movie.id}`)}
            >
              <FaPlay /> Play Movie
          
            </button>
            
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      <div className="mt-4">
        <h3>Submit your Review</h3>
        <div className="form-group">
          <textarea
            className="form-control bg-dark text-white"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            rows="4"
          />
        </div>
        <div className="form-group mt-3">
          <label>Rating:</label>
          <select
            className="form-control bg-dark text-white"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button className="btn btn-success mt-3" onClick={handleReviewSubmit}>
          Submit Review
        </button>
      </div>

      <div className="mt-4">
        <h3>Reviews:</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="card bg-dark text-white mb-3">
              <div className="card-body">
                <p><strong>Rating: {review.rating}</strong></p>
                <p>{review.review}</p>
                <p><em>By: {review.email}</em></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
