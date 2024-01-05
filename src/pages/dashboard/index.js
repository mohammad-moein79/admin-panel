import { getSession, signOut } from "next-auth/react";
import userModel from "../../../databaseSetting/userModel";
import connectToDB from "../../../databaseSetting/connectToDB";

export default function Index({ user }) {
  console.log(user);
  return (
    <div className="h-screen bg-blue-500 w-full flex justify-center items-center">
      <div className="p-4 rounded-md bg-white">
        <div>
          <p className="font-normal text-[18px]">
            نام کاربری : {user.username}
          </p>
          <p className="font-normal text-[18px]">ایمیل : {user.email}</p>
          <p className="font-normal text-[18px]">
            نقش : {user.username === "ADMIN" ? "ادمین" : "کاربر"}
          </p>
        </div>
        <div className="w-full mt-4">
          <button
            onClick={() =>
              signOut({
                redirect: "/",
              })
            }
            className="w-full p-2 text-[18px] bg-red-500 rounded text-white "
          >
            خروج از حساب
          </button>
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
