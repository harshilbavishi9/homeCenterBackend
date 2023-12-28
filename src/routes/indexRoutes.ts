import express, { Router } from "express";
const router: Router = express.Router();
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import mainCategoryRoutes from "./mainCategoryRoutes";
import subCategoryRoutes from "./subCategoryRoutes";
import productRoutes from "./productRoutes";
import reviewRoutes from "./reviewRoutes";
import bannerRoutes from "./bannerRoutes";
import discountImgRoutes from "./discountImgRoutes";
import adRoutes from "./adRoutes";
import cartRoutes from "./cartRoutes";
import colorRoutes from "./colorRoutes";
import brandRoutes from "./brandRoutes";
import likeRoutes from "./likeRoutes";
import blogModel from "./blogRoutes";
import blogCategoryRoutes from "./blogCategoryRoutes";
import discountProduct from "./discountProductRoutes";
import addressRoutes from "./addressRoutes";
import OrderRroutes from "./orderRoutes";

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/maincategory", mainCategoryRoutes);
router.use("/subcategory", subCategoryRoutes);
router.use("/product", productRoutes);
router.use("/review", reviewRoutes);
router.use("/banner", bannerRoutes);
router.use("/discount", discountImgRoutes);
router.use("/ad", adRoutes);
router.use("/cart", cartRoutes);
router.use("/color", colorRoutes);
router.use("/brand", brandRoutes);
router.use("/like", likeRoutes);
router.use("/blog", blogModel);
router.use("/blogcategory", blogCategoryRoutes);
router.use("/discountproduct", discountProduct);
router.use("/address", addressRoutes);
router.use("/order", OrderRroutes);

export default router;