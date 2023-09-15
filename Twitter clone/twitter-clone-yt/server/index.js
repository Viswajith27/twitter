import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const cors = require('cors')
const app = express();
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
// Serve static files from the 'build' directory (the output of 'npm run build')


// Serve the React app on any route that doesn't match an API route
app.get('/', (req, res) => {
  res.json("hello");
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
