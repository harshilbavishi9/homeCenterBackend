import { Schema, Types, model } from "mongoose";
import { ModelStatus, OrderStatus, PaymentStatus } from "../utils/model-status";

export interface IOrderModel {
	address?: string;
	cart?: string;
	product?: string[];
	user?: Types.ObjectId;
	totalAmount?: number;
	PaymentStatus?: string;
	orderStatus?: string;
	status?: ModelStatus.Active;
}

const OrderSchema = new Schema<IOrderModel>({
	address: {
		type: Schema.Types.ObjectId,
		ref: "AddressModel",
		required: true,
	},
	cart: {
		type: Schema.Types.ObjectId,
		ref: "Cart",
		required: false,
	},
	product: [
		{
			type: Schema.Types.ObjectId,
			ref: "product",
			required: true,
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	PaymentStatus: {
		type: String,
		require: true,
		default: PaymentStatus.Pending,
	},
	orderStatus: {
		type: String,
		default: OrderStatus.Pending,
	},
	status: {
		type: Number,
		required: false,
		default: ModelStatus.Active,
	},
});

const OrderModel = model<IOrderModel>("Order", OrderSchema);

export default OrderModel;
