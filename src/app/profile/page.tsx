"use client";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout successful");

      setTimeout(() => {
        router.push('/login');
      }, 1700);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster/>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Logout out
      </button>
    </div>
  );
}
