import { Request, Response } from "express";
import CloudinaryService from "../utils/cloudinary";
import Blog from "../model/blogModel";

class BlogController {
	constructor() {}

	public async createBlog(req: Request, res: Response) {
		const { title, description, category } = req.body;
		const images = req.files as Express.Multer.File[];
		try {
			if (title == "" || description == "" || images?.length == 0) {
				return res.status(400).json({
					status: false,
					message: "All Fiels Are Required",
				});
			}
			const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));

			const uploadResults = await CloudinaryService.uploadMultipleImages(
				imagePaths,
			);
			let blogData = {
				title: title,
				description: description,
				category: category,
				images: imagePaths,
				publicId: uploadResults.map((i) => i.public_id),
				cloudinaryUrl: uploadResults.map((i) => i.url),
			};
			await Blog.create(blogData)
				.then((data) => {
					return res.status(201).json({
						status: true,
						message: "Blog Created Successfully",
						data: data,
					});
				})
				.catch((err) => {
					return res.status(400).json({
						status: false,
						message: "Blog Not Created",
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async getAllBlog(req: Request, res: Response) {
		try {
			const result = await Blog.find({}).populate("category");
			return res.status(200).json({
				status: true,
				data: result,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async getBlog(req: Request, res: Response) {
		await Blog.findById({ _id: req.params.id })
			.populate("category")
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
					message: "Blog can not find",
				});
			});
	}

	public async updateBlog(req: Request, res: Response) {
		try {
			const id = req.params.id;
			let blog = await Blog.findById(id);

			if (blog) {
				await CloudinaryService.destroyImages(blog.publicId as string[]);
				const images = req.files as Express.Multer.File[];
				const imagePaths = images.map((image) =>
					image.path.replace(/\\/g, "/"),
				);
				const result = await CloudinaryService.uploadMultipleImages(imagePaths);
				let blogData = {
					title: req.body.title,
					description: req.body.description,
					category: req.body.category,
					images: imagePaths,
					publicId: result.map((i) => i.public_id),
					cloudinaryUrl: result.map((i) => i.url),
				};
				let data = await Blog.findByIdAndUpdate({ _id: id }, blogData);

				return res.status(200).json({
					status: true,
					message: "blog and associated images deleted successfully",
					data: data,
				});
			} else {
				return res.status(400).json({
					message: "Wrong object ID or blog not found",
					status: false,
				});
			}
		} catch (error) {
			return res.status(500).json({
				status: false,
				messaage: "Internal Server Error",
			});
		}
	}

	public async deleteBlog(req: Request, res: Response) {
		try {
			const blogId = req.params.id;

			const blog = await Blog.findById(blogId);

			if (blog) {
				await CloudinaryService.destroyImages(blog.publicId as string[]);

				await Blog.findByIdAndDelete(blogId);

				return res.status(200).json({
					message: "blog and associated images deleted successfully",
					status: true,
				});
			} else {
				return res.status(400).json({
					message: "Wrong object ID or blog not found",
					status: false,
				});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: "Internal Server Error",
				status: false,
			});
		}
	}
}

export default BlogController;
