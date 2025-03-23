"use client";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout successful");

      setTimeout(() => {
        router.push("/login");
      }, 1700);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed", error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded-xl bg-green-500 text-white">
        {data === "nothing" ? (
          "Nothing"
        ) : (
        <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Logout out
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Get User Details
      </button>
    </div>
  );
}
