import { Request, Response } from "express";
import LikeModel from "../model/likeModel";
const ObjectId = require("mongodb").ObjectId;

export class LikeController {
  constructor() {
    let me = this;
  }

  public async CreateLike(req: Request, res: Response) {
    try {
      const { userid, productid } = req.body;

      if (!productid || !userid) {
        return res.status(512).json({
          message: "All Field Required ",
          status: false,
        });
      }
      const existingLike = await LikeModel.findOne({ userid: userid });

      if (existingLike) {
        if (existingLike.productid !== null && existingLike.productid !== undefined) {
          const productIndex = existingLike.productid.findIndex(
            (product) => product?.toString() === productid
          );

          if (productIndex !== -1) {
            return res.status(400).json({
              data: existingLike,
              message: "Product already in Like",
              status: true,
            });
          } else {
            existingLike.productid.push(productid);
          }
        }
        await existingLike.save();
        return res.status(200).json({
          data: existingLike,
          message: "Product Added Successfully",
          status: true,
        });
      } else {
        const newLike = new LikeModel({
          userid: userid,
          productid: productid,
        });

        await newLike.save();

        return res.status(200).json({
          data: newLike,
          message: "Like Created Successfully",
          status: true,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    }
  }

  public async getLike(req: Request, res: Response) {
    try {
      await LikeModel.find({})
        .then((data) => {
          if (data.length !== 0) {
            return res.status(200).json({
              data: data,
              count: data.length,
              status: true,
            });
          } else {
            return res.status(400).json({
              message: "like not found",
              count: 0,
              status: false,
            });
          }
        })
        .catch((err) => {
          return res.status(534).json({
            message: "like finding Some Error",
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

  public async deleteLike(req: Request, res: Response) {
    try {
      await LikeModel.findById(req.params.id)
        .then(async (data) => {
          if (data) {
            await LikeModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({
              message: "like Deleted Successfully",
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
            message: "like deleting Some Error",
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

  public async editLike(req: Request, res: Response) {
    try {
      const { userid, productid } = req.body;

      await LikeModel.findById(req.params.id)
        .then(async (data) => {
          if (data) {
            let likeData = {
              productid: productid,
              userid: userid,
            };

            await LikeModel.findByIdAndUpdate(req.params.id, likeData)
              .then((data) => {
                return res.status(200).json({
                  message: "like Updated Successfully",
                  status: true,
                });
              })
              .catch((err) => {
                return res.status(200).json({
                  message: "like updating Some Error",
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

  public async getOneLike(req: Request, res: Response) {
    try {
      await LikeModel.findById(req.params.id)
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
          return res.status(534).json({
            message: "like finding Some Error",
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

  public async deleteLikeProduct(req: Request, res: Response) {
    try {
      const { productid, userid } = req.body;
      if (!productid || !userid) {
        return res.status(512).json({
          message: "productid and userid Field Required ",
          status: false,
        });
      }

      await LikeModel.findOne({ userid: userid })
        .then(async (data) => {
          if (data) {
            const objectId = new ObjectId(productid);
            const productIds = data.productid ?? [];
            const arr = [];

            for (var i = 0; i < productIds.length; i++) {
              if (!objectId.equals(productIds[i])) {
                arr.push(productIds[i]);
              }
            }

            await LikeModel.findByIdAndUpdate(data.id, { productid: arr })
              .then(() => {
                return res.status(200).json({
                  message: "like Updated Successfully",
                  status: true,
                });
              })
              .catch((err) => {
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
            message: "Like finding Some Error",
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

  public async getLikeProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await LikeModel.findOne({ userid: id })
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
            message: "like finding Some Error",
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

export default LikeController;
