const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
// const movieRoutes = require("./routes/MovieRoutes");  // Import movie routes
const reviewRoutes = require("./routes/ReviewRoutes");  // Import review routes

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Use movie and review routes
// app.use("/api/movie", movieRoutes);  // Endpoint for movie details
app.use("/api/reviews", reviewRoutes);  // Endpoint for reviews

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
