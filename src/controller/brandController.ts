import { Request, Response } from "express";
import Brand from "../model/brandModel";

class BrandController {
  constructor() { }

  public async createBrand(req: Request, res: Response) {
    try {
      await Brand.create(req.body)
        .then((data) => {
          return res.status(201).json({
            status: true,
            message: "Brand Created Successfully",
            data: data,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: false,
            message: "Brand is not Created",
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

  public async getAllBrand(req: Request, res: Response) {
    try {
      await Brand.find({})
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Success",
            data: data,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: false,
            message: "Brand is not Avilable",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  public async getBrand(req: Request, res: Response) {
    try {
      await Brand.findById({ _id: req.params.id })
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Success",
            data: data,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: false,
            message: "Brand is not Avilable",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  public async updateBrand(req: Request, res: Response) {
    try {
      await Brand.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Brand Updated Successfully",
            data: data,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: false,
            message: "Brand is not Updated",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  public async deleteBrand(req: Request, res: Response) {
    try {
      await Brand.findByIdAndDelete({ _id: req.params.id })
        .then((data) => {
          return res.status(200).json({
            status: true,
            message: "Brand Deleted Successfully",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: false,
            message: "Brand is not Avilable",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }
}
export default BrandController;
