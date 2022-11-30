import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import api routes
import api from "./routers/api.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// use api routes
app.use("/api", api);

export default app;
