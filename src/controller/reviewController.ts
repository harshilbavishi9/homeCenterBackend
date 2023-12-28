import { Request, Response } from "express";
import Review from "../model/reviewModel";
import Product from "../model/productModel";

export class ReviewController {
	constructor() {
		let me = this;
	}

	public async CreateReview(req: Request, res: Response) {
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

			const review = await Review.create(reviewData);

			const reviews = await Review.find({ productId: productId });

			let sum: any = 0;
			reviews.forEach((element) => {
				sum += element.ratings;
			});
			const avg = sum / reviews.length;
			console.log(avg);

			await Product.findByIdAndUpdate(productId, { ratings: avg });

			return res.status(200).json({
				data: review,
				message: "Review Created Successfully",
				status: true,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: "Internal Server Error",
				status: false,
			});
		}
	}

	public async getReview(req: Request, res: Response) {
		try {
			await Review.find({})
				.then((data) => {
					if (data.length !== 0) {
						return res.status(200).json({
							data: data,
							count: data.length,
							status: true,
						});
					} else {
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
		} catch (error) {
			return res.status(500).json({
				message: "Internal Server Error",
				status: false,
			});
		}
	}

	public async deleteReview(req: Request, res: Response) {
		try {
			await Review.findById(req.params.id)
				.then(async (data) => {
					if (data) {
						await Review.findByIdAndDelete(req.params.id);
						return res.status(200).json({
							data: "review Deleted Successfully",
							status: true,
						});
					} else {
						return res.status(400).json({
							data: "wrong object id",
							status: false,
						});
					}
				})
				.catch((err) => {
					return res.status(534).json({
						message: "review deleting Some Error",
						status: false,
					});
				});
		} catch (error) {
			return res.status(500).json({
				message: "Internal Server Error",
				status: false,
			});
		}
	}

	public async editReview(req: Request, res: Response) {
		try {
			const { title, experience, ratings, userId, productId } = req.body;

			await Review.findById(req.params.id)
				.then(async (data) => {
					if (data) {
						let reviewData = {
							productId: productId,
							userId: userId,
							title: title,
							experience: experience,
							ratings: ratings,
						};

						await Review.findByIdAndUpdate(req.params.id, reviewData)
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
					} else {
						return res.status(400).json({
							data: "wrong object id",
							status: false,
						});
					}
				})
				.catch((err) => {
					return res.status(534).json({
						message: "some thing wrong",
						status: false,
					});
				});
		} catch (error) {
			return res.status(500).json({
				message: "Internal Server Error",
				status: false,
			});
		}
	}

	public async getOneReview(req: Request, res: Response) {
		try {
			await Review.findById(req.params.id)
				.then(async (data) => {
					if (data) {
						return res.status(200).json({
							data: data,
							status: true,
						});
					} else {
						return res.status(400).json({
							data: "wrong object id",
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
		} catch (error) {
			return res.status(500).json({
				message: "Internal Server Error",
				status: false,
			});
		}
	}

	public async getReviewProduct(req: Request, res: Response) {
		try {
			// Use aggregation to join reviews with product details
			const result = await Review.aggregate([
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
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
}

export default ReviewController;
