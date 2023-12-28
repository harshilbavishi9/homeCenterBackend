import { Request, Response } from "express";
import Color from "../model/colorModel";

class ColorController {
	constructor() {}

	public async createColor(req: Request, res: Response) {
		try {
			await Color.create(req.body)
				.then((data) => {
					return res.status(201).json({
						status: true,
						message: "Color Created Successfully",
						data: data,
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Color is not Created",
					});
				});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async getAllColor(req: Request, res: Response) {
		try {
			await Color.find({})
				.then((data) => {
					return res.status(200).json({
						status: true,
						message: "Success",
						data: data,
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Color is not Avilable",
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async getColor(req: Request, res: Response) {
		try {
			await Color.findById({ _id: req.params.id })
				.then((data) => {
					return res.status(200).json({
						status: true,
						message: "Success",
						data: data,
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Color is not Avilable",
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async updateColor(req: Request, res: Response) {
		try {
			await Color.findByIdAndUpdate({ _id: req.params.id }, req.body)
				.then((data) => {
					return res.status(200).json({
						status: true,
						message: "Color Updated Successfully",
						data: data,
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Color is not Updated",
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async deleteColor(req: Request, res: Response) {
		try {
			await Color.findByIdAndDelete({ _id: req.params.id })
				.then((data) => {
					return res.status(200).json({
						status: true,
						message: "Color Deleted Successfully",
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Color is not Avilable",
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
export default ColorController;
