import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_KEY = "3d39d6bfe362592e6aa293f01fbcf9b9"; // Keep the API key for future use if needed

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get("movieName"); // Get the movieName from the URL query parameter

  const [embedUrl, setEmbedUrl] = useState(null); // Store the movie embed URL
  const [loading, setLoading] = useState(true); // To show loading spinner or message

  // Function to extract IMDb ID from the movie name
  const fetchIMDbIdFromName = async (name) => {
    try {
      const response = await axios.get(`https://www.imdbapi.com/?t=${name}&apikey=${API_KEY}`);
      if (response.data && response.data.imdbID) {
        return response.data.imdbID; // Return the IMDb ID
      } else {
        throw new Error("IMDb ID not found");
      }
    } catch (error) {
      console.error("Error fetching IMDb ID:", error);
      return null;
    }
  };

  // Fetch the movie embed link after getting IMDb ID
  const fetchMovieEmbedLink = async (imdbId) => {
    try {
      const response = await axios.get(`https://vidsrc.xyz/embed/movie/${imdbId}`);
      if (response.data) {
        setEmbedUrl(response.data.embedUrl); // Set the embed URL in the state
        setLoading(false); // Set loading to false after the data is fetched
      }
    } catch (error) {
      console.error("Error fetching movie embed link:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    if (movieName) {
      setLoading(true); // Set loading to true before starting to fetch data
      fetchIMDbIdFromName(movieName).then((imdbId) => {
        if (imdbId) {
          fetchMovieEmbedLink(imdbId);
        } else {
          setLoading(false); // If IMDb ID isn't found, stop loading
        }
      });
    }
  }, [movieName]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
        padding: "2rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 2,
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft style={{ fontSize: "2rem", color: "white" }} />
      </div>
      <div
        style={{
          width: "75vw",
          height: "75vh",
          backgroundColor: "black",
          position: "relative",
          overflow: "hidden",
          marginTop: "20px",
          marginLeft: "20px",
          border: "2px solid white",
        }}
      >
        {loading ? (
          <p
            style={{
              color: "white",
              fontSize: "1.5rem",
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            Loading movie...
          </p>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            title="Movie Player"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        ) : (
          <p
            style={{
              color: "white",
              fontSize: "1.5rem",
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            Movie not found.
          </p>
        )}
      </div>
    </div>
  );
}
