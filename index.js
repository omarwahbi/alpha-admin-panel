import dotenv from "dotenv";
import express from "express";
import cors from "cors";
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

// cors middleware
app.use(
  cors({
    origin: "https://alpha-admin-panel-front.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(cookieParser({}));
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/aboutUs", aboutUsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/logos", logosRoutes);
app.use("/api/contactUs", contactUs);

app.listen(8800, function () {
  console.log("CORS-enabled web server listening on port 80");
});
