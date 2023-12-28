import * as express from "express";
import DiscountController from "../controller/discountImgController";
// import { searchMiddleware } from "../middleware/search";
import { multiUpload, upload } from "../utils/multer";
import { isAuthenticatedUser } from "../middleware/auth";
const discountRoutes = express.Router();
const Controller = new DiscountController();

discountRoutes.post(
  "/create",
  isAuthenticatedUser,
  multiUpload,
  Controller.createDiscount
);

discountRoutes.get("/all", Controller.getDiscount);

discountRoutes.get("/get/:id", Controller.getOneDiscount);

discountRoutes.delete("/delete/:id", Controller.deleteDiscount);

discountRoutes.put("/edit/:id", multiUpload, Controller.editDiscount);

export default discountRoutes;
