import { Request, Response } from "express";
import UserModel, { IUserModel } from "../model/userModel";
import { generateOtp } from "../utils/otp";
import OtpModel from "../model/otpModel";
import {
	generateToken,
	isOtpExpired,
	updateOtp,
	updateUserVerification,
} from "../services/userServices";

class UserController {
	public async signUpSignIn(req: Request, res: Response) {
		try {
			const { mobile } = req.body;
			const user = await UserModel.findOne({ mobile });
			const otp = generateOtp();
			const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

			if (user) {
				await updateOtp({ mobile, otp, expiresIn: otpExpiration });
				return res.json({ success: true, message: "OTP sent successfully" });
			}

			const newUser = await UserModel.create({ mobile });
			await OtpModel.create({ otp, mobile, expiresIn: otpExpiration, newUser });

			return res.json({
				success: true,
				message: "User created and OTP sent successfully",
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
	}

	public async verifyOtp(req: Request, res: Response) {
		const { mobile, email, otp } = req.body;

		try {
			const findUser = await UserModel.findOne({ mobile });
			const otpEntry = await OtpModel.findOne({
				$or: [{ mobile, email }],
				otp,
			});
			if (!otpEntry || isOtpExpired(otpEntry.expiresIn as Date | undefined)) {
				return res.status(401).json({
					success: false,
					message: "Invalid OTP",
				});
			}

			await updateUserVerification(findUser);
			const token = generateToken(findUser);

			return res.status(200).json({
				success: true,
				message: "OTP Verified successfully",
				findUser,
				token,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: "Internal Server Error",
			});
		}
	}

	public async updateUser(req: Request, res: Response) {
		try {
			const updatedUser = await UserModel.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true },
			);

			if (!updatedUser) {
				return res
					.status(404)
					.json({ status: false, message: "User not found" });
			}

			return res.status(200).json({
				success: true,
				message: "User updated successfully",
				user: updatedUser,
			});
		} catch (error) {
			console.log("Error updating user:", error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async deleteUser(req: Request, res: Response) {
		try {
			const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

			if (!deletedUser) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			return res
				.status(200)
				.json({ success: true, message: "User deleted successfully" });
		} catch (error) {
			console.log("Error deleting user:", error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async getAllUser(req: Request, res: Response) {
		try {
			const users = await UserModel.find({
				$or: [
					{ firstName: { $regex: req.searchRegex } },
					{ lastName: { $regex: req.searchRegex } },
					{ email: { $regex: req.searchRegex } },
					{ gender: { $regex: req.searchRegex } },
					{ mobile: { $regex: req.searchRegex } },
				],
			})
				.skip(req.query.skip ? parseInt(req.query.skip as string) : 0)
				.limit(req.query.limit ? parseInt(req.query.limit as string) : 10);
			return res.status(200).json({
				success: true,
				message: "Success",
				length: users.length,
				users: users,
			});
		} catch (error) {
			console.error("Error fetching users:", error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	public async getUser(req: Request, res: Response) {
		try {
			const user = await UserModel.findById(req.params.id);
			return res.json({
				success: true,
				message: "Success",
				user: user,
			});
		} catch (error) {
			console.log("Error fetching user:", error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}
}

export default UserController;
