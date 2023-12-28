import { Schema, model, Document } from "mongoose";

export interface IlikeModel extends Document {
    productid?: [string],
    userid?: string,
    timeStamp?: number,
}

const likeSchema = new Schema<IlikeModel>({
    productid: [{ type: Schema.Types.ObjectId, ref: 'product', require: false, }],
    userid: { type: Schema.Types.ObjectId, ref: 'User', require: false, },
}, { timestamps: true });

const likeModel = model<IlikeModel>('like', likeSchema);

export default likeModel;