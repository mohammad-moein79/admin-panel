import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function RigthBar() {
  return (
    <div className="w-[18%] inline-block bg-white rounded-md p-3  min-h-full">
      <ul className="w-full h-full justify-between flex flex-col gap-4">
        <div className="w-full">
          <li className="w-full  mb-3  text-[17px] hover:text-white mgLink rounded-md">
            <Link href={"/dashboard"} className="inline-block w-full p-2 ">
              خانه
            </Link>
          </li>
          <li className="w-full  mb-3  text-[17px] hover:text-white mgLink rounded-md">
            <Link href={"users"} className="inline-block w-full p-2 ">
              کاربران
            </Link>
          </li>
        </div>
        <li
          onClick={() =>
            signOut({
              redirect: "/",
            })
          }
          className="w-full p-2 mb-3 cursor-pointer text-[17px] hover:bg-red-500  hover:text-white rounded-md"
        >
          خروج از حساب
        </li>
      </ul>
    </div>
  );
}

export default RigthBar;
