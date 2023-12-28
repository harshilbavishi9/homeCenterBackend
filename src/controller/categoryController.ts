import express, { Request, Response } from "express";
import CloudinaryService from "../utils/cloudinary";
import Category from "../model/categoryModel";

class CategoryController {
  public async createCategory(req: Request, res: Response) {
    try {
      const image = req.file;

      if (!image) {
        return res
          .status(400)
          .json({ success: false, nerror: "Image is required" });
      }

      const result = await CloudinaryService.uploadSingleImage(image?.path);

      const newCategory = await Category.create({
        name: req.body.name,
        mainCategory: req.body.mainCategory,
        image: image?.path.replace(/\\/g, "/"),
        cloudinaryUrl: result.url,
        publicId: result.result?.public_id,
      });

      return res.status(201).json({
        success: true,
        message: " category created successfully",
        newCategory,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

  public async getAllCategory(req: Request, res: Response) {
    try {
      const categories = await Category.find({})
        .populate("mainCategory")
        .exec();
      return res.status(200).json({
        success: true,
        message: "List of  categories",
        length: categories.length,
        categories,
      });
    } catch (error) {
      console.log("Error updating user:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  public async getCategory(req: express.Request, res: express.Response) {
    try {
      const category = await Category.findById(req.params.id)
        .populate("mainCategory")
        .exec();

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      return res.status(200).json({
        success: true,
        message: " category details",
        category,
      });
    } catch (error) {
      console.log("Error deleting user:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  public async updateCategory(req: express.Request, res: express.Response) {
    try {
      const CategoryId = req.params.id;

      const category = await Category.findById(CategoryId);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      CloudinaryService.deleteSingleImage(category.publicId as string);
      const result = await CloudinaryService.uploadSingleImage(
        req.file?.path as string
      );
      const updatedCategory = await Category.findByIdAndUpdate(
        CategoryId,
        {
          category: req.body,
          image: req.file?.path.replace(/\\/g, "/"),
          cloudinaryUrl: result.url,
          publicId: result.result?.public_id,
        },
        { new: true }
      );

      if (!updatedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
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

  public async deleteCategory(req: express.Request, res: express.Response) {
    try {
      const CategoryId = req.params.id;
      const category = await Category.findByIdAndDelete(CategoryId);

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
