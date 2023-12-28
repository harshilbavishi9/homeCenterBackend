import { Request, Response } from "express";
import CloudinaryService from "../utils/cloudinary";
import Product, { IProductModel } from "../model/productModel";
import { ModelStatus } from "../utils/model-status";
import { IProductFilterUpdate } from "../utils/interface";

class ProductController {
	public async createProduct(req: Request, res: Response) {
		try {
			const images = req.files as Express.Multer.File[];
			const {
				title,
				withDiscount,
				originalPrice,
				Overview,
				countInStock,
				subCategory,
				brand,
				color,
				discount,
				review,
				description,
			} = req.body;
			if (!images || images.length === 0) {
				return res.status(400).json({
					status: false,
					error: "Images are required",
				});
			}
			const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
			const uploadResults = await CloudinaryService.uploadMultipleImages(
				imagePaths,
			);

			const newProduct: IProductModel = new Product({
				title,
				withDiscount,
				discount,
				originalPrice,
				Overview,
				countInStock,
				subCategory,
				color,
				brand,
				review,
				description,
				images: imagePaths,
				cloudinaryUrl: uploadResults.map((i) => i.public_id),
				publicId: uploadResults.map((i) => i.url),
			});

			const savedProduct: IProductModel = await newProduct.save();
			res.status(201).json({
				status: true,
				message: "Product Created Successfully",
				savedProduct,
			});
		} catch (error) {
			console.log("Error creating product:", error);
			res.status(500).json({
				status: false,
				error: "Internal Server Error",
			});
		}
	}

	public async getAllProduct(req: Request, res: Response) {
		try {
			let pipeline = [];

			pipeline.push({
				$lookup: {
					from: "discountproducts",
					localField: "discount",
					foreignField: "_id",
					as: "discount",
				},
			});

			pipeline.push({
				$lookup: {
					from: "brands",
					localField: "brand",
					foreignField: "_id",
					as: "brand",
				},
			});

			pipeline.push({
				$lookup: {
					from: "reviews",
					localField: "review",
					foreignField: "_id",
					as: "review",
				},
			});

			pipeline.push({
				$lookup: {
					from: "colors",
					localField: "color",
					foreignField: "_id",
					as: "color",
				},
			});

			pipeline.push({
				$lookup: {
					from: "subcategories",
					localField: "subCategory",
					foreignField: "_id",
					as: "subCategory",
				},
			});

			pipeline.push({
				$unwind: "$subCategory",
			});

			pipeline.push({
				$lookup: {
					from: "maincategories",
					localField: "subCategory.mainCategory",
					foreignField: "_id",
					as: "subCategory.mainCategory",
				},
			});

			pipeline.push({
				$unwind: "$subCategory.mainCategory",
			});

			pipeline.push({
				$lookup: {
					from: "categories",
					localField: "subCategory.category",
					foreignField: "_id",
					as: "subCategory.category",
				},
			});

			pipeline.push({
				$unwind: "$subCategory.category",
			});

			if (req.searchRegex) {
				pipeline.push({
					$match: {
						$or: [
							{ title: { $regex: req.searchRegex } },
							{ description: { $regex: req.searchRegex } },
							{ "discount.name": { $regex: req.searchRegex } },
							{ "color.name": { $regex: req.searchRegex } },
							{ "brand.name": { $regex: req.searchRegex } },
							{ "discount.name": { $regex: req.searchRegex } },
							{ "subCategory.name": { $regex: req.searchRegex } },
							{ "subCategory.mainCategory.name": { $regex: req.searchRegex } },
							{ "subCategory.category.name": { $regex: req.searchRegex } },
						],
					},
				});
			}
			if (req.pagination) {
				pipeline.push({
					$skip: req.pagination.skip,
				});
				pipeline.push({
					$limit: req.pagination.limit,
				});
			}

			if (req.startDate) {
				pipeline.push({
					$match: {
						createdAt: { $gte: req.startDate },
					},
				});
			} else if (req.specificDate) {
				pipeline.push({
					$match: {
						createdAt: {
							$gte: req.specificDate.start,
							$lte: req.specificDate.end,
						},
					},
				});
			}

			if (req.query.isSpecial) {
				pipeline.push({
					$match: {
						isSpecial:
							req.query.isSpecial === ("1" as string)
								? ModelStatus.Active
								: ModelStatus.Deactivate,
					},
				});
			}

			if (req.query.isAvailable) {
				pipeline.push({
					$match: {
						isAvailable:
							req.query.isAvailable === ("1" as string)
								? ModelStatus.Active
								: ModelStatus.Deactivate,
					},
				});
			}

			if (req.query.isFeatured) {
				pipeline.push({
					$match: {
						isFeatured:
							req.query.isFeatured === ("1" as string)
								? ModelStatus.Active
								: ModelStatus.Deactivate,
					},
				});
			}

			if (req.query.isBestSeller) {
				pipeline.push({
					$match: {
						isBestSeller:
							req.query.isBestSeller === ("1" as string)
								? ModelStatus.Active
								: ModelStatus.Deactivate,
					},
				});
			}

			if (req.query.isLatest) {
				pipeline.push({
					$match: {
						isLatest:
							req.query.isLatest === ("1" as string)
								? ModelStatus.Active
								: ModelStatus.Deactivate,
					},
				});
			}

			if (req.query.sortBy as [string]) {
				switch (req.query.sortBy) {
					case "New Arrivals":
						pipeline.push({
							$sort: { createdAt: -1 },
						});
						break;
					case "Discount":
						pipeline.push({
							$sort: { "discount.name": -1 },
						});
						break;
					case "Price - Low to High":
						pipeline.push({
							$sort: { withDiscount: 1 },
						});
						break;
					case "Price - High to Low":
						pipeline.push({
							$sort: { withDiscount: -1 },
						});
						break;
					case "Relevance":
						break;
					case "Alphabetical":
						pipeline.push({
							$sort: { title: 1 },
						});
						break;
					default:
						break;
				}
			}
			const products = await Product.aggregate(pipeline as any);

			const bulkUpdateOps = products.map((product: IProductFilterUpdate) => {
				const updateOps = {
					isAvailable:
						product.countInStock > 0
							? ModelStatus.Active
							: ModelStatus.Deactivate,
					isSpecial:
						product.discount.name >= "35%"
							? ModelStatus.Active
							: ModelStatus.Deactivate,
					isLatest:
						product.createdAt > new Date().setDate(new Date().getDate() - 7)
							? ModelStatus.Active
							: ModelStatus.Deactivate,
					isBestSeller:
						product.order > 50 ? ModelStatus.Active : ModelStatus.Deactivate,
					isFeatured:
						product.viewCount > 100
							? ModelStatus.Active
							: ModelStatus.Deactivate,
				};

				return {
					updateOne: {
						filter: { _id: product._id },
						update: { $set: updateOps },
					},
				};
			});

			await Product.bulkWrite(bulkUpdateOps);

			res.json({
				status: true,
				message: "Product Fatched Successfully",
				length: products.length,
				products,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async getProduct(req: Request, res: Response) {
		try {
			const productId = req.params.id;

			const product = await Product.findById(productId);

			if (!product) {
				return res.status(404).json({
					status: false,
					error: "Product not found",
				});
			}

			product.viewCount = (product.viewCount || 0) + 1;

			await product.save();

			res.status(200).json({
				status: true,
				message: "Product Fetched Successfully",
				data: product,
			});
		} catch (error) {
			console.log("Error getting product:", error);
			return res.status(500).json({
				status: false,
				message: "Internal server error",
			});
		}
	}

	public async updateProduct(req: Request, res: Response) {
		try {
			let {
				title,
				withDiscount,
				originalPrice,
				Overview,
				countInStock,
				subCategory,
				brand,
				color,
				discount,
				review,
				description,
			} = req.body;
			const id = req.params.id;
			let product = await Product.findById(id);

			if (product) {
				await CloudinaryService.destroyImages(product.publicId as string[]);
				const images = req.files as Express.Multer.File[];
				const imagePaths = images.map((image) =>
					image.path.replace(/\\/g, "/"),
				);
				const result = await CloudinaryService.uploadMultipleImages(imagePaths);
				let productData = {
					title,
					withDiscount,
					originalPrice,
					Overview,
					countInStock,
					subCategory,
					brand,
					color,
					discount,
					review,
					description,
					images: imagePaths,
					publicId: result.map((i) => i.public_id),
					cloudinaryUrl: result.map((i) => i.url),
				};
				await Product.findByIdAndUpdate({ _id: id }, productData)
					.then((data) => {
						return res.status(200).json({
							status: true,
							message: "Product Updated Successfully",
							data: data,
						});
					})
					.catch((err) => {
						return res.status(400).json({
							status: false,
							message: "Product Can Not Updated",
						});
					});
			}
			return res.status(404).json({
				status: false,
				message: "Product Can Not Find",
			});
		} catch (error) {
			console.log("Error updating main category:", error);
			return res.status(500).json({
				status: false,
				message: "Internal server error",
			});
		}
	}

	public async deleteProduct(req: Request, res: Response) {
		try {
			const productId = req.params.id;

			const product = await Product.findById(productId);

			if (product) {
				await CloudinaryService.destroyImages(product?.publicId as string[]);

				await Product.findByIdAndDelete(productId);

				return res.status(200).json({
					message: "Product and associated images deleted successfully",
					status: true,
				});
			} else {
				return res.status(400).json({
					message: "Wrong object ID or product not found",
					status: false,
				});
			}
		} catch (error) {
			console.log("Error deleting main category:", error);
			return res.status(500).json({
				status: false,
				message: "Internal server error",
			});
		}
	}
}

export default ProductController;
