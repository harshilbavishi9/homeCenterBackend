"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userRoutes_1 = __importDefault(require("./userRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const mainCategoryRoutes_1 = __importDefault(require("./mainCategoryRoutes"));
const subCategoryRoutes_1 = __importDefault(require("./subCategoryRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const reviewRoutes_1 = __importDefault(require("./reviewRoutes"));
const bannerRoutes_1 = __importDefault(require("./bannerRoutes"));
const discountImgRoutes_1 = __importDefault(require("./discountImgRoutes"));
const adRoutes_1 = __importDefault(require("./adRoutes"));
const cartRoutes_1 = __importDefault(require("./cartRoutes"));
const colorRoutes_1 = __importDefault(require("./colorRoutes"));
const brandRoutes_1 = __importDefault(require("./brandRoutes"));
const likeRoutes_1 = __importDefault(require("./likeRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const blogCategoryRoutes_1 = __importDefault(require("./blogCategoryRoutes"));
const discountProductRoutes_1 = __importDefault(require("./discountProductRoutes"));
const addressRoutes_1 = __importDefault(require("./addressRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
router.use("/user", userRoutes_1.default);
router.use("/category", categoryRoutes_1.default);
router.use("/maincategory", mainCategoryRoutes_1.default);
router.use("/subcategory", subCategoryRoutes_1.default);
router.use("/product", productRoutes_1.default);
router.use("/review", reviewRoutes_1.default);
router.use("/banner", bannerRoutes_1.default);
router.use("/discount", discountImgRoutes_1.default);
router.use("/ad", adRoutes_1.default);
router.use("/cart", cartRoutes_1.default);
router.use("/color", colorRoutes_1.default);
router.use("/brand", brandRoutes_1.default);
router.use("/like", likeRoutes_1.default);
router.use("/blog", blogRoutes_1.default);
router.use("/blogcategory", blogCategoryRoutes_1.default);
router.use("/discountproduct", discountProductRoutes_1.default);
router.use("/address", addressRoutes_1.default);
router.use("/order", orderRoutes_1.default);
exports.default = router;