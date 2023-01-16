import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import api routes
import api from "./routers/api.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(process.env.APP_PORT || 3000, () =>
      console.log(`Server running at port ${process.env.APP_PORT || 3000}`)
    )
  )
  .catch((error) => console.log(error.message));

// use api routes
app.use("/api", api);

export default app;
