import express from "express";
import { editAboutUs, getAboutUs } from "../controllers/aboutUs.js";

const router = express.Router();

router.get("/", getAboutUs);

router.put("/edit", editAboutUs);

export default router;
