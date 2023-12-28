import express, { Router } from "express";
import ColorController from "../controller/colorController";
import { isAuthenticatedUser } from "../middleware/auth";
import { upload } from "../utils/multer";
const router: Router = express.Router();
const Controller = new ColorController();

router.post("/create", isAuthenticatedUser, upload, Controller.createColor);

router.get("/all", Controller.getAllColor);

router.get("/single/:id", Controller.getColor);

router.put("/:id", upload, isAuthenticatedUser, Controller.updateColor);

router.delete("/:id", Controller.deleteColor);

export default router;
