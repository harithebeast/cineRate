import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

const API_KEY = "3d39d6bfe362592e6aa293f01fbcf9b9";

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");

  const [trailerKey, setTrailerKey] = useState(null);
  const videoNode = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  useEffect(() => {
    if (trailerKey && videoNode.current) {
      player.current = videojs(videoNode.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        techOrder: ["youtube"],
        sources: [
          {
            src: `https://www.youtube.com/watch?v=${trailerKey}`,
            type: "video/youtube",
          },
        ],
      });
    }

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [trailerKey]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
        padding: "2rem", // Add padding to create space on all sides
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
          marginLeft: "20px", // Ensure there’s additional left spacing
          border: "2px solid white", // Optional: Add a border for visual clarity
        }}
      >
        
  
        {trailerKey ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <div data-vjs-player style={{ width: "100%", height: "100%" }}>
              <video
                ref={videoNode}
                className="video-js vjs-default-skin"
                style={{ width: "100%", height: "100%" }}
                playsInline
              ></video>
            </div>
          </div>
        ) : (
          <p
            style={{
              color: "white",
              fontSize: "1.5rem",
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            Loading trailer...
          </p>
        )}
      </div>
    </div>
  );
  
}
