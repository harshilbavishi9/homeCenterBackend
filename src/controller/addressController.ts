import { Request, Response } from "express";
import AddressModel from "../model/addressModel";

class AddressController {
	constructor() {
		let me = this;
	}

	public async createAddress(req: Request, res: Response) {
		try {
			await AddressModel.create(req.body)
				.then((data) => {
					return res.status(200).json({
						message: "Address Created Successfully",
						status: true,
						data,
					});
				})
				.catch((err) => {
					return res.status(200).json({
						message: "Address Can Not Created",
						status: true,
					});
				});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: "Internal Server Error",
				status: false,
			});
		}
	}

	public async getAddress(req: Request, res: Response) {
		try {
			await AddressModel.find({
				$or: [{ name: { $regex: req.searchRegex } }],
			})
				.skip(req.query.skip ? parseInt(req.query.skip as string) : 0)
				.limit(req.query.limit ? parseInt(req.query.limit as string) : 10)
				.then((data) => {
					if (data.length !== 0) {
						return res.status(200).json({
							data: data,
							count: data.length,
							status: true,
						});
					} else {
						return res.status(400).json({
							message: "address not found",
							status: false,
						});
					}
				})
				.catch(() => {
					return res.status(534).json({
						message: "address finding Some Error",
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

	public async getOneAddress(req: Request, res: Response) {
		try {
			await AddressModel.findById(req.params.id)
				.then((data) => {
					if (data) {
						return res.status(200).json({
							data: data,
							status: true,
						});
					} else {
						return res.status(400).json({
							message: "wrong object id",
							status: false,
						});
					}
				})
				.catch(() => {
					return res.status(534).json({
						message: "address finding Some Error",
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

	public async deleteAddress(req: Request, res: Response) {
		try {
			const adId = req.params.id;

			await AddressModel.findById(adId);
			return res.status(200).json({
				message: "address deleted successfully",
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

	public async updateAddress(req: Request, res: Response) {
		try {
			let address = await AddressModel.findById(req.params.id);
			if (address) {
				return res.status(400).json({
					status: false,
					message: "Address Not Found",
				});
			}
			await AddressModel.findByIdAndUpdate(req.params.id, req.body)
				.then((data) => {
					return res.status(200).json({
						status: true,
						message: "Address Updated Successfully",
						data,
					});
				})
				.catch((err) => {
					return res.status(400).json({
						status: false,
						message: "Address Can Not Updated",
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
}
export default AddressController;
