import express from "express";
import {
  addLogo,
  deleteLogo,
  editLogo,
  getLogo,
  getLogos,
} from "../controllers/logos.js";

const router = express.Router();

router.get("/", getLogos);
router.get("/:id", getLogo);
router.post("/", addLogo);
router.delete("/:id", deleteLogo);
router.put("/:id", editLogo);

export default router;
