import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "../../../../databaseSetting/userModel";
import { comparePasses } from "../../../../utils/toolsAPI";
import connectToDB from "../../../../databaseSetting/connectToDB";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectToDB();
        const { identifire, password } = credentials;

        if (identifire.trim().length <= 2 || password.trim().length <= 7) {
          throw new Error("مقادیر معتبر نیستند !");
        }

        const userData = await userModel.findOne({
          $or: [{ username: identifire }, { email: identifire }],
        });

        if (!userData) {
          throw new Error("نام کاربری یا ایمیل اشتباه است !");
        }

        const isValidpassword = await comparePasses(
          password,
          userData.password
        );

        if (!isValidpassword) {
          throw new Error("نام کاربری یا ایمیل  یا رمز عبور اشتباه است !");
        }

        return {
          email: userData.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
