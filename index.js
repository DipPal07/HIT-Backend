import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoleEnum } from "./src/utils/constant.js";
import connectDB from "./src/utils/db.js";
import healthCheckRoute from "./src/routes/healthCheck.routes.js";

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/health-check", healthCheckRoute);
app.get("/", (req, res) => {
  res.send("Hello World!", userRoleEnum, "hello world!");
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
});
