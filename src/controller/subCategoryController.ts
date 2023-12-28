import { Request, Response } from "express";
import CloudinaryService from "../utils/cloudinary";
import SubCategory from "../model/subCategoryModel";
import subCategory from "../model/subCategoryModel";
// import { searchMiddleware } from "../middleware/search";

class CategoryController {
	public async createSubCategory(req: Request, res: Response) {
		try {
			const image = req.file;

			if (!image) {
				return res
					.status(400)
					.json({ success: false, error: "Image is required" });
			}

			const result = await CloudinaryService.uploadSingleImage(image?.path);

			const newCategory = await SubCategory.create({
				name: req.body.name,
				mainCategory: req.body.mainCategory,
				category: req.body.category,
				image: image?.path.replace(/\\/g, "/"),
				cloudinaryUrl: result.url,
				publicId: result.result?.public_id,
			});
			return res.status(201).json({
				success: true,
				message: "Subcategory created successfully",
				newCategory,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
	}

	public async getAllSubCategory(req: Request, res: Response) {
		try {
			let pipeline = [];
			pipeline.push({
				$lookup: {
					from: "maincategories",
					localField: "mainCategory",
					foreignField: "_id",
					as: "mainCategory",
				},
			});

			pipeline.push({
				$unwind: "$mainCategory",
			});

			pipeline.push({
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",
				},
			});

			pipeline.push({
				$unwind: "$category",
			});

			if (req.searchRegex) {
				pipeline.push({
					$match: {
						$or: [
							{ name: { $regex: req.searchRegex } },
							{
								"mainCategory.name": { $regex: req.searchRegex },
							},
							{ "category.name": { $regex: req.searchRegex } },
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
			let categories = await subCategory.aggregate(pipeline);
			return res.status(200).json({
				success: true,
				message: "List of categories",
				length: categories.length,
				categories,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}

	public async getSubCategory(req: Request, res: Response) {
		try {
			const category = await SubCategory.findById(req.params.id)
				.populate("mainCategory")
				.populate("category")
				.exec();

			if (!category) {
				return res
					.status(404)
					.json({ success: false, message: "SubCategory not found" });
			}

			return res.status(200).json({
				success: true,
				message: "category details",
				category,
			});
		} catch (error) {
			console.log("Error deleting user:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}

	public async updateSubCategory(req: Request, res: Response) {
		try {
			const CategoryId = req.params.id;

			const category = await SubCategory.findById(CategoryId);
			if (!category) {
				return res
					.status(404)
					.json({ success: false, message: "SubCategory not found" });
			}

			CloudinaryService.deleteSingleImage(category.publicId as string);
			const result = await CloudinaryService.uploadSingleImage(
				req.file?.path as string,
			);
			console.log(result);
			const updatedCategory = await SubCategory.findByIdAndUpdate(
				CategoryId,
				{
					category: req.body.category,
					mainCategory: req.body.mainCategory,
					image: req.file?.path.replace(/\\/g, "/"),
					cloudinaryUrl: result?.url,
					publicId: result?.result?.public_id,
				},
				{ new: true },
			);
			if (!updatedCategory) {
				return res
					.status(404)
					.json({ success: false, message: "SubCategory not found" });
			}
			return res.status(200).json({
				success: true,
				message: " category updated successfully",
				updatedCategory,
			});
		} catch (error) {
			console.log("Error fetching users:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}

	public async deleteSubCategory(req: Request, res: Response) {
		try {
			const CategoryId = req.params.id;
			const category = await SubCategory.findByIdAndDelete(CategoryId);

			if (!category) {
				return res
					.status(404)
					.json({ success: false, message: "SubCategory not found" });
			}

			await Promise.all([
				category.cloudinaryUrl &&
					CloudinaryService.deleteSingleImage(category.publicId as string),
			]);

			return res.status(200).json({
				success: false,
				message: "category deleted successfully",
			});
		} catch (error) {
			console.log("Error deleting main category:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}
}

export default CategoryController;
