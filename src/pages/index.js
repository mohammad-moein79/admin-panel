import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Home() {
  const [identifire, setIdentifire] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const route = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      route.replace("/dashboard");
    }
  }, [session.status]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      identifire,
      password,
      redirect: false,
    });

    if (res.status === 200) {
      route.replace("/dashboard");
    }

    setError(res.error);

    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <div className="bg-blue-400 p-4 min-h-screen max-h-[100vh] flex items-center justify-center">
      <div className="bg-white h-[500px]  top-1 w-[855px] flex items-center flex-col md:flex-row gap-[30px]  rounded-md">
        <div className="w-full p-3 flex flex-col h-[90%] md:w-1/2">
          <h2 className="text-[35px] text-center font-bold">ورود</h2>
          <form
            onSubmit={submitHandler}
            className="flex items-start mt-16 mb-4  justify-between h-1/3 w-full flex-col gap-[15px] "
          >
            {error ? (
              <p className="text-right text-red-500">خطا : {error}</p>
            ) : null}
            <div className="w-full">
              <input
                value={identifire}
                placeholder="نام کاربری یا ایمیل..."
                onChange={(e) => setIdentifire(e.target.value)}
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
            <div className="mt-5 flex flex-col items-center w-full">
              <a href="/" className="text-center mb-4 text-slate-600">
                آیا رمز خود را فراموش کرده اید ؟
              </a>
              <button className="bg-blue-500 hover:bg-blue-600 w-full rounded-md font-normal pb-2 text-[20px] text-white">
                ورود
              </button>
            </div>
          </form>
        </div>
        <div className="w-full flex justify-center items-center md:w-1/2 img_LOGIN_OR_SINGIN h-full">
          <div className="flex justify-center flex-col items-center gap-[15px]">
            <h1 className="text-[25px] text-center flex-col  font-bold text-white">
              سلام , دوست عزیز !!
            </h1>
            <div className="flex justify-center items-center gap-[15px] flex-col">
              <p className=" text-center mt-5 font-normal text-white">
                خوش امدید !<br /> اگر شما اکانت ندارید میتوانید از طریق دکمه زیر
                ثبت نام کنید .
              </p>
              <Link
                href={"/register"}
                className="border-2 pt-2 border-solid w-[145px] text-center rounded mt-2 border-white text-white p-3"
              >
                ثبت نام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
