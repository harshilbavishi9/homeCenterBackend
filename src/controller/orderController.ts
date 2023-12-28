import { Request, Response } from "express";
import OrderModel from "../model/orderModel";
import CartModel, { ICartItem, ICartModel } from "../model/cartModel";

class OrderController {
	constructor() {}

	public async createOrder(req: Request, res: Response) {
		try {
			let { address, cart, user, PaymentStatus, product } = req.body;
			let findCartAmount: any = await CartModel.findOne({ _id: cart });
			if (!findCartAmount) {
				return res.status(400).json({
					success: false,
					message: "Cart is empty",
				});
			}

			await OrderModel.create({
				address,
				product: findCartAmount.items.map((item: any) => item.productId._id),
				user,
				PaymentStatus,
				totalAmount: findCartAmount.amount,
			})
				.then(async (data) => {
					await CartModel.findByIdAndDelete(cart);
					return res.status(200).json({
						success: true,
						message: "Order created successfully",
						data,
					});
				})
				.catch((error) => {
					console.log(error);
					return res.status(400).json({
						success: false,
						message: "Order is not created",
					});
				});
		} catch (error) {
			console.log(error);

			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async getOrdersById(req: Request, res: Response) {
		try {
			await OrderModel.find({ _id: req.params.id })
				.populate("product")
				.populate("user")
				.then((data) => {
					return res.status(200).json({
						success: true,
						message: "Orders fetched successfully",
						data,
					});
				})
				.catch((error) => {
					console.log(error);
					return res.status(500).json({
						success: false,
						message: "Internal server error",
					});
				});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async getOrdersByUserId(req: Request, res: Response) {
		try {
			await OrderModel.find({ user: req.params.id })
				.populate("product")
				.populate("user")
				.then((data) => {
					return res.status(200).json({
						success: true,
						message: "Orders fetched successfully",
						data,
					});
				})
				.catch((error) => {
					console.log(error);
					return res.status(400).json({
						success: false,
						message: "Orders Not fetched",
					});
				});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async getOrdersByProductId(req: Request, res: Response) {
		try {
			await OrderModel.find({ product: req.params.id })
				.populate("product")
				.populate("user")
				.then((data) => {
					return res.status(200).json({
						success: true,
						message: "Orders fetched successfully",
						data,
					});
				})
				.catch((error) => {
					console.log(error);
					return res.status(500).json({
						success: false,
						message: "Internal server error",
					});
				});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async getAllOrder(req: Request, res: Response) {
		try {
			const order = await OrderModel.find();
			return res.status(200).json({
				success: true,
				message: "Orders fetched successfully",
				order,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async deleteOrder(req: Request, res: Response) {
		try {
			await OrderModel.findByIdAndDelete(req.params.id)
				.then((data) => {
					return res.status(200).json({
						success: true,
						message: "Order deleted successfully",
					});
				})
				.catch((error) => {
					console.log(error);
					return res.status(500).json({
						success: false,
						message: "Order Not deleted",
					});
				});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}
}

export default OrderController;
