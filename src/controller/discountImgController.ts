import { Request, Response } from "express";
import DiscountModel from "../model/discountImgModel";
import CloudinaryService from "../utils/cloudinary";

class DiscountController {
  constructor() {
    let me = this;
  }

  public async createDiscount(req: Request, res: Response) {
    try {
      const images = req.files as Express.Multer.File[];

      const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));

      const uploadResults = await CloudinaryService.uploadMultipleImages(
        imagePaths
      );
      let discountData = {
        images: imagePaths,
        publicId: uploadResults.map((i) => i.public_id),
        cloudinaryUrl: uploadResults.map((i) => i.url),
      };
      let discount = await DiscountModel.create(discountData);
      return res.status(200).json({
        message: "Images uploaded successfully",
        status: true,
        discount: discount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    }
  }

  public async getDiscount(req: Request, res: Response) {
    try {
      await DiscountModel.find({})
        .then((data) => {
          if (data.length !== 0) {
            return res.status(200).json({
              data: data,
              count: data.length,
              status: true,
            });
          } else {
            return res.status(400).json({
              message: "discount not found",
              status: false,
            });
          }
        })
        .catch(() => {
          return res.status(534).json({
            message: "discount finding Some Error",
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

  public async getOneDiscount(req: Request, res: Response) {
    try {
      await DiscountModel.findById(req.params.id)
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
            message: "discount finding Some Error",
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

  public async deleteDiscount(req: Request, res: Response) {
    try {
      const discountId = req.params.id;

      const discount = await DiscountModel.findById(discountId);

      if (discount) {
        await CloudinaryService.destroyImages(discount.publicId as string[]);

        await DiscountModel.findByIdAndDelete(discountId);

        return res.status(200).json({
          message: "Discount and associated images deleted successfully",
          status: true,
        });
      } else {
        return res.status(400).json({
          message: "Wrong object ID or discount not found",
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

  public async editDiscount(req: Request, res: Response) {
    try {
      const id = req.params.id;
      let discount = await DiscountModel.findById(id);

      if (discount) {
        await CloudinaryService.destroyImages(discount.publicId as string[]);
        const images = req.files as Express.Multer.File[];
        const imagePaths = images.map((image) =>
          image.path.replace(/\\/g, "/")
        );
        const result = await CloudinaryService.uploadMultipleImages(imagePaths);
        let discountData = {
          images: imagePaths,
          publicId: result.map((i) => i.public_id),
          cloudinaryUrl: result.map((i) => i.url),
        };
        let data = await DiscountModel.findByIdAndUpdate(
          { _id: id },
          discountData
        );

        return res.status(200).json({
          status: true,
          message: "Discount and associated images deleted successfully",
          data: data,
        });
      } else {
        return res.status(400).json({
          message: "Wrong object ID or discount not found",
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

export default DiscountController;
