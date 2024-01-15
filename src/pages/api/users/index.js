import { getSession } from "next-auth/react";
import connectToDB from "../../../../databaseSetting/connectToDB";
import userModel from "../../../../databaseSetting/userModel";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res.status(403).json({
      massage: "method in not valid !",
    });
  }

  connectToDB();

  const session = await getSession(req.cookie);

  const users = await userModel.find({});

  return res.status(201).json(users);
}
