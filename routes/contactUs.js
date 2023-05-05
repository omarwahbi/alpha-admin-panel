import express from "express";
import {
  addForm,
  deleteForm,
  getForm,
  getForms,
} from "../controllers/contactUs.js";

const router = express.Router();

router.get("/", getForms);
router.get("/:id", getForm);
router.post("/", addForm);
router.delete("/:id", deleteForm);

export default router;
