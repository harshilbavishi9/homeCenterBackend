import { Request, Response } from "express";
import CloudinaryService from "../utils/cloudinary";
import mainCategory from "../model/mainCategoryModel";

class MainCategoryController {
	public async createMainCategory(req: Request, res: Response) {
		try {
			const image = req.file;

			if (!image) {
				return res.status(400).json({
					success: false,
					error: "Image is required",
				});
			}
			const { result, url } = await CloudinaryService.uploadSingleImage(
				image?.path,
			);

			const newMainCategory = await mainCategory.create({
				name: req.body.name,
				image: image?.path.replace(/\\/g, "/"),
				cloudinaryUrl: url,
				publicId: result?.public_id,
			});

			return res.status(201).json({
				success: true,
				message: "Main category created successfully",
				newMainCategory,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: "Internal Server Error",
			});
		}
	}

	public async getAllMainCategory(req: Request, res: Response) {
		try {
			const { limit, skip } = req.pagination || { limit: 10, skip: 0 };

			const categories = await mainCategory
				.find({
					$or: [{ name: { $regex: req.searchRegex } }],
				})
				.skip(req.query.skip ? parseInt(req.query.skip as string) : 0)
				.limit(req.query.limit ? parseInt(req.query.limit as string) : 10);

			return res.status(200).json({
				success: true,
				message: "List of main categories",
				length: categories.length,
				categories,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async getMainCategory(req: Request, res: Response) {
		try {
			const category = await mainCategory.findById(req.params.id);

			if (!category) {
				return res.status(404).json({
					success: false,
					message: "Category not found",
				});
			}

			return res.status(200).json({
				success: true,
				message: "Main category details",
				category,
			});
		} catch (error) {
			console.log("Error getting main category:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}

	public async updateMainCategory(req: Request, res: Response) {
		try {
			const mainCategoryId = req.params.id;
			const category = await mainCategory.findById(mainCategoryId);

			if (!category) {
				return res
					.status(404)
					.json({ success: false, message: "Category not found" });
			}

			await Promise.all([
				CloudinaryService.deleteSingleImage(category.publicId as string),
			]);

			const url = await CloudinaryService.uploadSingleImage(
				req.file?.path as string,
			);

			const updatedCategory = await mainCategory.findByIdAndUpdate(
				mainCategoryId,
				{
					category: req.body,
					image: req.file?.path.replace(/\\/g, "/"),
					cloudinaryUrl: url.url,
					publicId: url.result?.public_id,
				},
				{ new: true },
			);

			if (!updatedCategory) {
				return res
					.status(404)
					.json({ success: false, message: "Category not found" });
			}

			return res.status(200).json({
				success: true,
				message: "Main category updated successfully",
				updatedCategory,
			});
		} catch (error) {
			console.log("Error updating main category:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}

	public async deleteMainCategory(req: Request, res: Response) {
		try {
			const mainCategoryId = req.params.id;
			const category = await mainCategory.findByIdAndDelete(mainCategoryId);

			if (!category) {
				return res
					.status(404)
					.json({ success: false, message: "Category not found" });
			}

			await Promise.all([
				category.cloudinaryUrl &&
					CloudinaryService.deleteSingleImage(category.publicId as string),
			]);

			return res.status(200).json({
				success: true,
				message: "Main category deleted successfully",
			});
		} catch (error) {
			console.log("Error deleting main category:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}
}

export default MainCategoryController;
