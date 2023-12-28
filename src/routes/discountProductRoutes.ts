import express, { Router } from "express";
import DiscountController from "../controller/discountProductController";
import { isAuthenticatedUser } from "../middleware/auth";
import { upload } from "../utils/multer";
const router: Router = express.Router();
const Controller = new DiscountController();

router.post("/create", upload, Controller.createDiscount);

router.get("/all", Controller.getAllDiscount);

router.get("/single/:id", Controller.getDiscount);

router.put("/:id", upload, isAuthenticatedUser, Controller.updateDiscount);

router.delete("/:id", Controller.deleteDiscount);

export default router;
