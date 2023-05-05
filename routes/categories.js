import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
} from "../controllers/categories.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", editCategory);

export default router;
