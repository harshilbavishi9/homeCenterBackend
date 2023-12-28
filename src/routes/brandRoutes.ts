import express, { Router } from "express";
import BrandController from "../controller/brandController";
import { isAuthenticatedUser } from "../middleware/auth";
import { upload } from "../utils/multer";
const router: Router = express.Router();
const Controller = new BrandController();

router.post("/create", isAuthenticatedUser, upload, Controller.createBrand);

router.get("/all", Controller.getAllBrand);

router.get("/single/:id", Controller.getBrand);

router.put("/:id", upload, isAuthenticatedUser, Controller.updateBrand);

router.delete("/:id", Controller.deleteBrand);

export default router;
