import { Schema, model, Document, Types } from "mongoose";
import { ModelStatus, OrderStatus } from '../utils/model-status';

export interface ICartItem {
    productId?: Types.ObjectId;
    quantity: number;
}
export interface ICartModel {
    items: ICartItem[];
    amount: number;
    userId?: Types.ObjectId;
    status?: number
}

const CartSchema = new Schema<ICartModel>({
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            require: false,
        },
        quantity: { type: Number, default: 1 },
        _id: false
    }],
    amount: { type: Number, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: false, },
    status: { type: Number, default: ModelStatus.Active }
}, { timestamps: true });

const CartModel = model<ICartModel>('Cart', CartSchema);

export default CartModel;