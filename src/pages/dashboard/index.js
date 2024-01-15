import { getSession, signOut } from "next-auth/react";
import userModel from "../../../databaseSetting/userModel";
import connectToDB from "../../../databaseSetting/connectToDB";
import Link from "next/link";
import { useState } from "react";

export default function Index({ user }) {
  return (
    <div className="h-screen bg-blue-500 w-full flex justify-center items-center">
      <div className="p-4 rounded-md bg-white">
        <div>
          <p className="font-normal text-[18px]">
            نام کاربری : {user.username}
          </p>
          <p className="font-normal text-[18px]">ایمیل : {user.email}</p>
          <p className="font-normal text-[18px]">
            نقش : {user.role === "ADMIN" ? "ادمین" : "کاربر"}
          </p>
        </div>
        <div className="w-full mt-4 flex flex-col gap-3">
          <button
            onClick={() =>
              signOut({
                redirect: "/",
              })
            }
            className="w-full p-2 text-[18px] bg-red-500 hover:bg-red-600 rounded text-white "
          >
            خروج از حساب
          </button>
          {user.role === "ADMIN" && (
            <div>
              <a
                href={"/dashboard/adminPanel/users"}
                className="p-2 inline-block w-full text-center text-[18px] mt-1 bg-indigo-500 hover:bg-indigo-600 rounded text-white"
              >
                پنل مدیریت
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(req) {
  connectToDB();
  const session = await getSession(req);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const userData = await userModel.findOne({
    email: session.user.email,
  });

  const { username, email, role } = userData;

  return {
    props: {
      user: { username, email, role },
    },
  };
}
