import mongoose from "mongoose";
import { hashPassword } from "../../../../utils/toolsAPI";
import connectToDB from "../../../../databaseSetting/connectToDB";
import userModel from "../../../../databaseSetting/userModel";
import Router from "next/router";

export default async function (req, res) {
  if (req.method !== "POST") {
    return false;
  }

  connectToDB();

  const { username, email, password } = JSON.parse(req.body);

  if (
    username.trim().length <= 2 ||
    email.trim().length <= 4 ||
    password.trim().length <= 7
  ) {
    return res.status(403).json({
      massage: "مقادیر معتبر نیستند !",
    });
  }

  const passwordHashed = await hashPassword(password);

  const usersExist = await userModel.find({
    $or: [{ username }, { email }],
  });

  if (usersExist.length) {
    return res.status(402).json({
      massage: " از این ایمیل یا نام کاربری استفاده شده است !",
    });
  }

  const users = await userModel.find({});

  await userModel.create({
    username,
    email,
    password: passwordHashed,
    role: users.length == 0 ? "ADMIN" : "USER",
  });

  return res.status(201).json({
    massage: "ثبت نام شد",
  });
}
