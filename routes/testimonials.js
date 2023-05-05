import express from "express";
import {
  addTestimonial,
  deleteTestimonial,
  editTestimonial,
  getTestimonial,
  getTestimonials,
} from "../controllers/testimonials.js";

const router = express.Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonial);
router.post("/", addTestimonial);
router.delete("/:id", deleteTestimonial);
router.put("/:id", editTestimonial);

export default router;
