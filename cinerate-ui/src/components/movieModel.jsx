import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function MovieModal({ movie, onClose }) {
  return (
    <ModalContainer>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="background-image"
        />
        <div className="content">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal {
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      svg {
        font-size: 1.5rem;
        color: #333;
      }
    }
    .background-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .content {
      h2 {
        margin: 0;
        font-size: 2rem;
      }
      p {
        margin: 1rem 0 0;
        font-size: 1rem;
        color: #555;
      }
    }
  }
`;
