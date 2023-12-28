import { Request, Response } from "express";
import CartModel from "../model/cartModel";
const ObjectId = require("mongodb").ObjectId;

export class CartController {
  constructor() {
    let me = this;
  }

  public async CreateCart(req: Request, res: Response) {
    try {
      const { productId, userId, quantity } = req.body;
      const newItem = {
        productId: productId,
        quantity: quantity,
      };
      const existingCart = await CartModel.findOne({ userId: userId })
      if (existingCart) {
        const existingProductIndex = existingCart.items.findIndex(
          (item: any) => item.productId.toString() === productId.toString()
        );
        if (existingProductIndex !== -1) {
          existingCart.items.splice(existingProductIndex, 1)[0];
        } else {
          existingCart.items.push(newItem);
        }
        await existingCart.save()
          .then((data) => {
            return res.status(200).json({
              status: true,
              message: "Cart updated successfully",
              data: data,
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({
              message: "Internal Server Error",
              status: false,
            });
          })
      } else {
        const newCart = new CartModel({
          userId: userId,
          items: [newItem],
        });
        await newCart.save()
          .then((data) => {
            return res.status(200).json({
              status: true,
              message: "Cart created successfully",
              data: data,
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({
              message: "Internal Server Error",
              status: false,
            });
          })
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    }
  }

  public async getCart(req: Request, res: Response) {
    try {
      await CartModel.find({}).populate("items.productId", "title withDiscount originalPrice publicId").exec()
        .then((data) => {
          if (data.length !== 0) {
            return res.status(200).json({
              data: data,
              count: data.length,
              status: true,
            });
          } else {
            return res.status(400).json({
              message: "cart not found",
              count: 0,
              status: false,
            });
          }
        })
        .catch((err) => {
          return res.status(534).json({
            message: "cart finding Some Error",
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

  public async deleteCart(req: Request, res: Response) {
    try {
      await CartModel.findById(req.params.id)
        .then(async (data) => {
          if (data) {
            await CartModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({
              message: "cart Deleted Successfully",
              status: true,
            });
          } else {
            return res.status(400).json({
              message: "wrong object id",
              status: false,
            });
          }
        })
        .catch((err) => {
          return res.status(534).json({
            message: "cart deleting Some Error",
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

  public async editCart(req: Request, res: Response) {
    try {
      const { userid, productid } = req.body;

      await CartModel.findById(req.params.id)
        .then(async (data) => {
          if (data) {
            let cartData = {
              productid: productid,
              userid: userid,
            };

            await CartModel.findByIdAndUpdate(req.params.id, cartData)
              .then((data) => {
                return res.status(200).json({
                  message: "cart Updated Successfully",
                  status: true,
                });
              })
              .catch((err) => {
                return res.status(200).json({
                  message: "cart updating Some Error",
                  status: true,
                });
              });
          } else {
            return res.status(400).json({
              message: "wrong object id",
              status: false,
            });
          }
        })
        .catch((err) => {
          return res.status(534).json({
            message: "some thing wrong",
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

  public async getOneCart(req: Request, res: Response) {
    try {
      await CartModel.findById(req.params.id).populate("items.productId", "title withDiscount originalPrice publicId").exec()
        .then(async (data: any) => {
          if (data && data?.items.length > 0) {
            let amount = 0;
            for (let i = 0; i < data?.items.length; i++) {
              amount += data?.items[i].quantity * data?.items[i].productId.withDiscount;
            }
            data.amount = amount;
            await data.save();
            return res.status(200).json({
              status: true,
              message: "Success",
              length: data?.items.length,
              data: data,
            })
          } else {
            return res.status(400).json({
              message: "wrong object id",
              status: false,
            });
          }
        })
        .catch((err) => {
          return res.status(534).json({
            message: "cart finding Some Error",
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

  public async deleteCartProduct(req: Request, res: Response) {
    try {
      const { productid, userid } = req.body;
      if (!productid || !userid) {
        return res.status(512).json({
          message: "productid and userid Field Required ",
          status: false,
        });
      }
      await CartModel.findOne({ userid: userid })
        .then(async (data: any) => {
          if (data) {
            const objectId = new ObjectId(productid);
            const productIds = data?.productid;
            const arr = [];

            if (productIds) {
              for (var i = 0; i < productIds.length; i++) {
                if (!objectId.equals(productIds[i])) {
                  arr.push(productIds[i]);
                }
              }
            }
            await CartModel.findByIdAndUpdate(data.id, { productid: arr })
              .then(() => {
                return res.status(200).json({
                  message: "cart Updated Successfully",
                  status: true,
                });
              })
              .catch(() => {
                return res.status(534).json({
                  message: "product removing Some Error",
                  status: false,
                });
              });
          } else {
            return res.status(400).json({
              message: "wrong object id",
              status: false,
            });
          }
        })
        .catch((err) => {
          return res.status(534).json({
            message: "Cart finding Some Error",
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

  public async getCartProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await CartModel.findOne({ userid: id })
        .populate({
          path: "productid",
          select: ["productimage", "code", "title", "description"],
        })
        .exec()
        .then(async (data) => {
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
        .catch((err) => {
          console.log(err);
          return res.status(534).json({
            message: "cart finding Some Error",
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
}

export default CartController;
