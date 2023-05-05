import express from "express";
import {
  addProject,
  deleteProject,
  editProject,
  getProject,
  getProjects,
} from "../controllers/projects.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", addProject);
router.delete("/:id", deleteProject);
router.put("/:id", editProject);

export default router;
