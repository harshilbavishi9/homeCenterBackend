"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const reviewModel_1 = __importDefault(require("../model/reviewModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
class ReviewController {
    constructor() {
        let me = this;
    }
    CreateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, experience, ratings, userId, productId } = req.body;
                if (!title || !experience || !ratings || !productId || !userId) {
                    return res.status(512).json({
                        message: "All Field Required ",
                        status: false,
                    });
                }
                const reviewData = {
                    productId: productId,
                    userId: userId,
                    title: title,
                    experience: experience,
                    ratings: ratings,
                };
                const review = yield reviewModel_1.default.create(reviewData);
                const reviews = yield reviewModel_1.default.find({ productId: productId });
                let sum = 0;
                reviews.forEach((element) => {
                    sum += element.ratings;
                });
                const avg = sum / reviews.length;
                console.log(avg);
                yield productModel_1.default.findByIdAndUpdate(productId, { ratings: avg });
                return res.status(200).json({
                    data: review,
                    message: "Review Created Successfully",
                    status: true,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reviewModel_1.default.find({})
                    .then((data) => {
                    if (data.length !== 0) {
                        return res.status(200).json({
                            data: data,
                            count: data.length,
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            data: "reviews not found",
                            count: 0,
                            status: false,
                        });
                    }
                })
                    .catch((err) => {
                    return res.status(534).json({
                        message: "review finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reviewModel_1.default.findById(req.params.id)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        yield reviewModel_1.default.findByIdAndDelete(req.params.id);
                        return res.status(200).json({
                            data: "review Deleted Successfully",
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            data: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    return res.status(534).json({
                        message: "review deleting Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    editReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, experience, ratings, userId, productId } = req.body;
                yield reviewModel_1.default.findById(req.params.id)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        let reviewData = {
                            productId: productId,
                            userId: userId,
                            title: title,
                            experience: experience,
                            ratings: ratings,
                        };
                        yield reviewModel_1.default.findByIdAndUpdate(req.params.id, reviewData)
                            .then((data) => {
                            return res.status(200).json({
                                data: "review Edited Successfully",
                                status: true,
                            });
                        })
                            .catch((err) => {
                            return res.status(200).json({
                                message: "review editing Some Error",
                                status: true,
                            });
                        });
                    }
                    else {
                        return res.status(400).json({
                            data: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    return res.status(534).json({
                        message: "some thing wrong",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getOneReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reviewModel_1.default.findById(req.params.id)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        return res.status(200).json({
                            data: data,
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            data: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    return res.status(534).json({
                        message: "review finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getReviewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use aggregation to join reviews with product details
                const result = yield reviewModel_1.default.aggregate([
                    {
                        $group: {
                            _id: "$productId",
                            averageRatings: { $avg: "$ratings" },
                            totalReviews: { $sum: 1 },
                            reviews: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "_id",
                            foreignField: "_id",
                            as: "productDetails",
                        },
                    },
                ]);
                // Extract the result from the aggregation
                const reviewSummaries = result.map((summary) => ({
                    productId: summary._id,
                    averageRatings: summary.averageRatings || 0,
                    totalReviews: summary.totalReviews || 0,
                    reviews: summary.reviews || [],
                    productDetails: summary.productDetails[0] || {},
                }));
                res.json({ reviewSummaries });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.ReviewController = ReviewController;
exports.default = ReviewController;
