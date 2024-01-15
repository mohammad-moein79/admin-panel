import RigthBar from "@/Components/RigthBar/RigthBar";
import React, { useState } from "react";
import userModel from "../../../../../databaseSetting/userModel";
import connectToDB from "../../../../../databaseSetting/connectToDB";
import { getSession } from "next-auth/react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import TopBar from "@/Components/TopBar/TopBar";
import UsersBox from "@/Components/UsersBox/UsersBox";
import AddUserModal from "@/Components/AddUserModal/AddUserModal";

function index({ user: { username, email, role } }) {
  const [isaddUserModal, setIsAddUserModal] = useState(false);

  const closeModalHandler = () => {
    setIsAddUserModal(false);
  };

  return (
    <div className="bg-blue-500 flex gap-[15px] p-3 min-h-screen">
      <RigthBar></RigthBar>
      <div className="w-[80%] min-h-full flex flex-col gap-[15px] rounded-md">
        <TopBar placeholder={"نام کاربری..."} username={username}></TopBar>
        <div className="bg-white rounded-md p-3 h-full  overflow-x-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-[25px] font-bold">کاربران</h1>
            <button
              onClick={() => setIsAddUserModal(true)}
              className="bg-green-500 text-white rounded-md p-3 hover:bg-green-600"
            >
              اضافه کردن
            </button>
          </div>
          <div className="p-[2px] img_LOGIN_OR_SINGIN rounded-xl mt-4 mb-2"></div>
          <UsersBox></UsersBox>
        </div>
      </div>
      {isaddUserModal && (
        <AddUserModal
          isShow={isaddUserModal}
          closeModalHandler={closeModalHandler}
        ></AddUserModal>
      )}
    </div>
  );
}

export default index;

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

  if (role != "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {
      user: { username, email, role },
    },
  };
}
