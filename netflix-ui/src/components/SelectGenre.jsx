import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchDataByGenre } from "../store";

const CustomSelect = styled(Select)({
  marginLeft: "5rem",
  cursor: "pointer",
  fontSize: "1.4rem",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "black",
  width: "15rem", // Set initial width
  transition: "width 0.3s ease-in-out", // Add transition for smooth width change
  "&:focus": {
    width: "20rem", // Adjust width when focused/expanded
  },
});

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState(""); // State to store selected genre

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedGenre(selectedValue); // Update selected genre in state
    dispatch(
      fetchDataByGenre({
        genres,
        genre: selectedValue,
        type,
      })
    );
  };

  return (
    <CustomSelect
      className="flex"
      onChange={handleChange}
      value={selectedGenre} // Bind selected value to state
      displayEmpty // Allow display of empty value
      inputProps={{ "aria-label": "Select Genre" }} // Aria label for accessibility
    >
      <MenuItem value="" disabled>
        Select Genre
      </MenuItem>
      {genres.map((genre) => (
        <MenuItem value={genre.id} key={genre.id}>
          {genre.name}
        </MenuItem>
      ))}
    </CustomSelect>
  );
}
