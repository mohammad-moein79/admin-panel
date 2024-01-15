import * as React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function UsersBox() {
  const [deletModal, setDeletemodal] = useState([null, false]);
  const [users, setUsers] = useState([]);
  const [IsShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const router = useRouter();

  const deletUserHandler = async (username) => {
    await fetch(`/api/users/${username}`, {
      method: "DELETE",
    });

    setDeletemodal([null, false]);
    router.refresh();
  };

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/users", {
        method: "GET",
      });

      const jsonres = await res.json();

      if (jsonres.length === 0) {
        setUsers([]);
      } else {
        setUsers(jsonres);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <div className="h-[70%] flex items-center justify-center ">
          <h2 className="text-slate-500">کاربری وجود ندارد...</h2>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td className="w-[35%]">{user.username}</td>
                <td className="w-[35%]">{user.email}</td>
                <td className="w-[10%]">
                  {user.role === "ADMIN" ? "ادمین" : "کاربر"}
                </td>
                <td className="w-full" align="center">
                  <div className="w-full flex items-center justify-end gap-[15px]">
                    {user.role === "USER" && (
                      <button
                        onClick={() => setDeletemodal([user.username, true])}
                        className="pt-2 pb-2 pr-5 pl-5 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        حذف{" "}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {deletModal[1] && (
        <Modal
          show={deletModal[1]}
          size="md"
          onClose={() => setDeletemodal([null, false])}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ایا میخاید که {deletModal[0]} را حذف کنید ؟
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => deletUserHandler(deletModal[0])}
                >
                  {"بله"}
                </Button>
                <Button
                  color="gray"
                  onClick={() => setDeletemodal([null, false])}
                >
                  نه خیر
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
