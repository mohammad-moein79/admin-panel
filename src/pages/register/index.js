import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

    const user = { username, email, password };

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const resJson = await res.json();

    if (res.status === 201) {
      route.replace("/");
    } else {
      const errorM = resJson.massage;
      setError(errorM);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="bg-blue-400 p-4 min-h-screen max-h-[100vh] flex items-center justify-center">
      <div className="bg-white h-[500px]  top-1 w-[855px] flex items-center flex-col md:flex-row gap-[30px]  rounded-md">
        <div className="w-full p-3 flex flex-col h-[90%] md:w-1/2">
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
            <div className="mt-5 flex flex-col items-center w-full">
              <button className="bg-blue-500 pt-2 hover:bg-blue-600 w-full rounded-md font-normal pb-2 text-[20px] text-white">
                ثبت نام
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
                خوش امدید !<br /> اگر شما اکانت دارید میتوانید از وارد حساب خود
                شوید .
              </p>
              <Link
                href={"/"}
                className="border-2 pt-2 border-solid w-[145px] text-center rounded mt-2 border-white text-white p-3"
              >
                ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
