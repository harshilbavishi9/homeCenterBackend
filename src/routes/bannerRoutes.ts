import * as express from "express";
import BannerController from "../controller/bannerController";
// import { searchMiddleware } from "../middleware/search";
import { multiUpload, upload } from "../utils/multer";
import { isAuthenticatedUser } from "../middleware/auth";
const bannerRoutes = express.Router();
const Controller = new BannerController();

bannerRoutes.post(
  "/create",
  isAuthenticatedUser,
  multiUpload,
  Controller.createBanner
);

bannerRoutes.get("/all", Controller.getBanner);

bannerRoutes.get("/get/:id", Controller.getOneBanner);

bannerRoutes.delete("/delete/:id", Controller.deleteBanner);

bannerRoutes.put("/edit/:id", multiUpload, Controller.editBanner);

export default bannerRoutes;
