import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Playermovie from "./pages/playmovie";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import MovieReview from "./pages/MovieReview"; // Import your movie review page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/player" element={<Player />} />
        <Route path="/playermovie" element={<Playermovie />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/new" element={<Player />} />
        <Route path="/mylist" element={<UserListedMovies />} />
        <Route path="/movie/:movieId" element={<MovieReview />} /> {/* Add movie review page route */}
        <Route path="/" element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  );
}
