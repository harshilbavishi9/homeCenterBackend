import express, { Router } from "express";
import mainCategoryController from "../controller/reviewController";
import { isAuthenticatedUser } from "../middleware/auth";
import { upload } from "../utils/multer";
const router: Router = express.Router();
const Controller = new mainCategoryController();

router.post("/create",isAuthenticatedUser, Controller.CreateReview);

router.get("/get", Controller.getReview);

router.delete("/delete/:id", Controller.deleteReview);

router.put("/edit/:id", Controller.editReview);

router.get("/get/:id", Controller.getOneReview);

router.post("/get/reviewproduct", Controller.getReviewProduct);
export default router;
