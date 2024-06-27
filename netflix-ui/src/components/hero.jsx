import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieModal from "./movieModel";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const api_key = '3d39d6bfe362592e6aa293f01fbcf9b9';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function Hero() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
        const data = await response.json();
        setMovies(data.results.slice(0, 10)); // Get the first 10 movies
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  return (
    <HeroContainer>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="background-image"
            />
            
           
            <div className="container">
            <h1 align="center">{movie.title}</h1>  
              <div className="logo">
              
              </div>
              <div className="buttons flex">
                <button
                  onClick={() => navigate(`/player?movieId=${movie.id}`)}
                  className="flex j-center a-center"
                >
                  <FaPlay />
                  Play
                </button>
                <button
                  className="flex j-center a-center"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <AiOutlineInfoCircle />
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </HeroContainer>
  );
}

const HeroContainer = styled.div`
  position: relative;
  .background-image {
    filter: brightness(60%);
  }
  img {
    height: 100vh;
    width: 100vw;
  }
  .container {
    position: absolute;
    bottom: 5rem;
    .logo {
      img {
        width: 100%;
        height: 100%;
        margin-left: 5rem;
        
      }
    }
    .buttons {
      margin: 5rem;
      gap: 2rem;
      button {
        font-size: 1.4rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
        &:nth-of-type(2) {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
          svg {
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`;

export default Hero;
