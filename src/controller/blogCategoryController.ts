import { Request, Response } from "express";
import blogCategory from "../model/blogCategoryModel";

class BlogCategoryController {
  constructor() {}

  public async createBlogCategory(req: Request, res: Response) {
    try {
      await blogCategory
        .create(req.body)
        .then((data) => {
          return res.status(201).json({
            status: true,
            message: "Blog Category Crated Successfully",
            data: data,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            status: false,
            message: "Blog Category Not Created",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  public async getBlogCategory(req: Request, res: Response) {
    try {
      await blogCategory
        .find({})
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Success",
            data: data,
          });
        })
        .catch((err) => {
          return res.status(404).json({
            status: false,
            message: "Blog Category Not Found",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  public async getOneBlogCategory(req: Request, res: Response) {
    try {
      await blogCategory
        .findById({ _id: req.params.id })
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Success",
            data: data,
          });
        })
        .catch((err) => {
          return res.status(404).json({
            status: false,
            message: "Blog Category Not Found",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  public async deleteBlogCategory(req: Request, res: Response) {
    try {
      await blogCategory
        .findByIdAndDelete({ _id: req.params.id })
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Blog Deleted Successfully",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            status: false,
            message: "Blog Not Deleted",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  public async editBlogCategory(req: Request, res: Response) {
    try {
      await blogCategory
        .findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Blog Updated Successfuly",
            data: data,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            status: false,
            message: "Blog Not Updated",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }
}

export default BlogCategoryController;
