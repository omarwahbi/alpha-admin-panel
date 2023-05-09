import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import testimonialsRoutes from "./routes/testimonials.js";
import aboutUsRoutes from "./routes/aboutUs.js";
import projectsRoutes from "./routes/projects.js";
import categoriesRoutes from "./routes/categories.js";
import logosRoutes from "./routes/logos.js";
import contactUs from "./routes/contactUs.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/aboutUs", aboutUsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/logos", logosRoutes);
app.use("/api/contactUs", contactUs);
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});
