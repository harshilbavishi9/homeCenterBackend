import UserModel, { IUserModel } from "../model/userModel";
import OtpModel from "../model/otpModel";
import jwt from "jsonwebtoken";
import { ModelStatus } from "../utils/model-status";

export async function updateOtp({
  mobile,
  otp,
  expiresIn,
}: {
  mobile: string;
  otp: string;
  expiresIn: Date;
}) {
  await OtpModel.findOneAndUpdate({ mobile }, { otp, expiresIn, mobile });
}

export function isOtpExpired(otpTimestamp: Number | undefined | any): boolean {
  const currentTime = new Date().getTime();
  return currentTime - otpTimestamp > 300000;
}

export async function updateUserVerification(user: IUserModel | null) {
  if (user) {
    await UserModel.findByIdAndUpdate(user._id, {
      mobileVerified: ModelStatus.Active,
    });
  }
}

export function generateToken(user: IUserModel | null): string {
  if (user) {
    const { _id, mobile, firstName, lastName, gender } = user;
    const userToken = { _id, mobile, firstName, lastName, gender };
    return jwt.sign({ userToken }, process.env.TOKEN_KEY as string, {
      expiresIn: "15d",
    });
  }
  return "";
}
