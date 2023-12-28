import { Request, Response } from "express";
import BannerModel from "../model/bannerModel";
import CloudinaryService from "../utils/cloudinary";

class BannerController {
  constructor() {
    let me = this;
  }

  public async createBanner(req: Request, res: Response) {
    try {
      const images = req.files as Express.Multer.File[];

      const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));

      const uploadResults = await CloudinaryService.uploadMultipleImages(
        imagePaths
      );  
      let bannerData = {
        images: imagePaths,
        publicId: uploadResults.map((i) => i.public_id),
        cloudinaryUrl: uploadResults.map((i) => i.url),
      };
      let banner = await BannerModel.create(bannerData);
      return res.status(200).json({
        message: "Images uploaded successfully",
        status: true,
        banner: banner,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    }
  }

  public async getBanner(req: Request, res: Response) {
    try {
      await BannerModel.find({})
        .then((data) => {
          if (data.length !== 0) {
            return res.status(200).json({
              data: data,
              count: data.length,
              status: true,
            });
          } else {
            return res.status(400).json({
              message: "banner not found",
              status: false,
            });
          }
        })
        .catch(() => {
          return res.status(534).json({
            message: "banner finding Some Error",
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

  public async getOneBanner(req: Request, res: Response) {
    try {
      await BannerModel.findById(req.params.id)
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
            message: "banner finding Some Error",
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

  public async deleteBanner(req: Request, res: Response) {
    try {
      const bannerId = req.params.id;

      const banner = await BannerModel.findById(bannerId);

      if (banner) {
        await CloudinaryService.destroyImages(banner?.publicId as string[]);

        await BannerModel.findByIdAndDelete(bannerId);

        return res.status(200).json({
          message: "Banner and associated images deleted successfully",
          status: true,
        });
      } else {
        return res.status(400).json({
          message: "Wrong object ID or banner not found",
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

  public async editBanner(req: Request, res: Response) {
    try {
      const id = req.params.id;
      let banner = await BannerModel.findById(id);

      if (banner) {
        await CloudinaryService.destroyImages(banner.publicId as string[]);
        const images = req.files as Express.Multer.File[];
        const imagePaths = images.map((image) =>
          image.path.replace(/\\/g, "/")
        );
        const result = await CloudinaryService.uploadMultipleImages(imagePaths);
        let bannerData = {
          images: imagePaths,
          publicId: result.map((i) => i.public_id),
          cloudinaryUrl: result.map((i) => i.url),
        };
        let data = await BannerModel.findByIdAndUpdate({ _id: id }, bannerData);

        return res.status(200).json({
          status: true,
          message: "Banner and associated images deleted successfully",
          data: data,
        });
      } else {
        return res.status(400).json({
          message: "Wrong object ID or banner not found",
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

export default BannerController;
