import { useRouter } from "next/navigation";
import React from "react";
import { CgProfile } from "react-icons/cg";

function TopBar({ username }) {
  const router = useRouter();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    router.replace(`/dashboard/adminPanel/search/${username}`);
  };

  return (
    <div className="bg-white overflow-hidden rounded-md p-3 flex items-center justify-between">
      <div>
        <form onSubmit={onSubmitHandler}>
          <div className=" parentInput">
            <input
              placeholder={"نام کاربری"}
              className="outline-none w-full rounded p-1 border-2 border-slate-700 font-normal "
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-[5px]">
        <h2>{username}</h2>
        <CgProfile className="text-[35px]"></CgProfile>
      </div>
    </div>
  );
}

export default TopBar;
