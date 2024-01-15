"use client";

import { Modal } from "flowbite-react";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddUserModal({ closeModalHandler, isShow }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const a = () => {
    closeModalHandler();
  };

  const roleUser = () => {
    if (role === "ادمین") {
      return "َADMIN";
    } else {
      return "USER";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const roleResult = await roleUser();

    const user = { username, email, password, role: roleResult };

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const resJson = await res.json();

    if (res.status === 201) {
      closeModalHandler();
    } else {
      const errorM = resJson.massage;
      setError(errorM);

      setTimeout(() => {
        setError("");
      }, 5000);
    }

    router.refresh();
  };

  return (
    <>
      <Modal show={isShow} size="md" onClose={a} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="w-full p-3 flex flex-col  ">
            <h2 className="text-[35px] text-center font-bold">ثبت نام</h2>
            <form
              onSubmit={submitHandler}
              className="flex items-start mt-16 mb-4  justify-between h-1/3 w-full flex-col gap-[15px] "
            >
              {error ? (
                <p className="text-right text-red-500">خطا : {error}</p>
              ) : null}
              <div className="w-full">
                <input
                  value={username}
                  placeholder="نام کاربری..."
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-none w-full rounded p-1 border-2 border-slate-700 font-normal"
                />
              </div>
              <div className="w-full">
                <input
                  value={email}
                  placeholder="ایمیل..."
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none w-full rounded p-1 border-2 border-slate-700 font-normal"
                />
              </div>
              <div className="w-full">
                <input
                  value={password}
                  placeholder="رمز عبور..."
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none w-full rounded p-1 border-2 border-slate-700 font-normal"
                />
              </div>
              <div className="w-full">
                <input
                  value={role}
                  placeholder="نقش: باید یا کاربر یا ادمین باشد"
                  type="text"
                  onChange={(e) => setRole(e.target.value)}
                  className="outline-none w-full rounded p-1 border-2 border-slate-700 font-normal"
                />
              </div>
              <div className="mt-5 flex flex-col items-center w-full">
                <button className="bg-blue-500 pt-2 hover:bg-blue-600 w-full rounded-md font-normal pb-2 text-[20px] text-white">
                  ثبت نام
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
