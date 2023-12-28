import { Request, Response } from "express";
import Discount from "../model/discountProductModel";

class DiscountController {
	constructor() {}

	public async createDiscount(req: Request, res: Response) {
		try {
			await Discount.create(req.body)
				.then((data) => {
					return res.status(201).json({
						status: true,
						message: "Discount Created Successfully",
						data: data,
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Discount is not Created",
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

	public async getAllDiscount(req: Request, res: Response) {
		try {
			await Discount.find({})
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
						message: "Discount is not Avilable",
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async getDiscount(req: Request, res: Response) {
		try {
			await Discount.findById({ _id: req.params.id })
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
						message: "Discount is not Avilable",
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async updateDiscount(req: Request, res: Response) {
		try {
			await Discount.findByIdAndUpdate({ _id: req.params.id }, req.body)
				.then((data) => {
					return res.status(200).json({
						status: true,
						message: "Discount Updated Successfully",
						data: data,
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Discount is not Updated",
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	public async deleteDiscount(req: Request, res: Response) {
		try {
			await Discount.findByIdAndDelete({ _id: req.params.id })
				.then((data) => {
					return res.status(200).json({
						status: true,
						message: "Discount Deleted Successfully",
					});
				})
				.catch((error) => {
					return res.status(400).json({
						status: false,
						message: "Discount is not Avilable",
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
export default DiscountController;
