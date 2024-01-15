import connectToDB from "../../../../databaseSetting/connectToDB";
import userModel from "../../../../databaseSetting/userModel";

export default async function handler(req, res) {
  if (req.method != "DELETE") {
    return res.json({
      massage: "method is not valid !",
    });
  }

  connectToDB();

  const { username } = req.query;

  await userModel.findOneAndDelete({
    username,
  });

  return res.json({
    massage: "user removed succesfully !",
  });
}
