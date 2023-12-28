import * as express from "express";
import AdController from "../controller/adController";
// import { searchMiddleware } from "../middleware/search";
import { multiUpload, upload } from "../utils/multer";
import { isAuthenticatedUser } from "../middleware/auth";
const AdRoutes = express.Router();
const Controller = new AdController();

AdRoutes.post("/create",isAuthenticatedUser, multiUpload, Controller.createAd);

AdRoutes.get("/all", Controller.getAd);

AdRoutes.get("/get/:id", Controller.getOneAd);

AdRoutes.delete("/delete/:id", Controller.deleteAd);

AdRoutes.put("/edit/:id", multiUpload, Controller.editAd);

export default AdRoutes;
