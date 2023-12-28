import { Request, Response } from "express";
import AdModel from "../model/adModel";
import CloudinaryService from "../utils/cloudinary";

class AdController {
  constructor() {
    let me = this;
  }

  public async createAd(req: Request, res: Response) {
    try {
      const images = req.files as Express.Multer.File[];

      const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));

      const uploadResults = await CloudinaryService.uploadMultipleImages(
        imagePaths
      );
      let adData = {
        images: imagePaths,
        publicId: uploadResults.map((i) => i.public_id),
        cloudinaryUrl: uploadResults.map((i) => i.url),
      };
      let ad = await AdModel.create(adData);
      return res.status(200).json({
        message: "Images uploaded successfully",
        status: true,
        ad: ad,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    }
  }

  public async getAd(req: Request, res: Response) {
    try {
      await AdModel.find({})
        .then((data) => {
          if (data.length !== 0) {
            return res.status(200).json({
              data: data,
              count: data.length,
              status: true,
            });
          } else {
            return res.status(400).json({
              message: "ad not found",
              status: false,
            });
          }
        })
        .catch(() => {
          return res.status(534).json({
            message: "ad finding Some Error",
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

  public async getOneAd(req: Request, res: Response) {
    try {
      await AdModel.findById(req.params.id)
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
            message: "ad finding Some Error",
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

  public async deleteAd(req: Request, res: Response) {
    try {
      const adId = req.params.id;

      const ad = await AdModel.findById(adId);

      if (ad) {
        await CloudinaryService.destroyImages(ad?.publicId as string[]);

        await AdModel.findByIdAndDelete(adId);

        return res.status(200).json({
          message: "ad and associated images deleted successfully",
          status: true,
        });
      } else {
        return res.status(400).json({
          message: "Wrong object ID or ad not found",
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

  public async editAd(req: Request, res: Response) {
    try {
      const id = req.params.id;
      let ad = await AdModel.findById(id);

      if (ad) {
        await CloudinaryService.destroyImages(ad?.publicId as string[]);
        const images = req.files as Express.Multer.File[];
        const imagePaths = images.map((image) =>
          image.path.replace(/\\/g, "/")
        );
        const result = await CloudinaryService.uploadMultipleImages(imagePaths);
        let adData = {
          images: imagePaths,
          publicId: result.map((i) => i.public_id),
          cloudinaryUrl: result.map((i) => i.url),
        };
        let data = await AdModel.findByIdAndUpdate({ _id: id }, adData);

        return res.status(200).json({
          status: true,
          message: "ad and associated images deleted successfully",
          data: data,
        });
      } else {
        return res.status(400).json({
          message: "Wrong object ID or ad not found",
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

export default AdController;
