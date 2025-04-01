"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default async function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [token, setToken] = useState<string | null>(null); // Store token separately

  const router = useRouter();

  useEffect(() => {
    // Extract token manually from the URL
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get("token"));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        toast.error("Both passwords must match");
        setLoading(false);
        return;
      }

      if (!token) {
        toast.error("Invalid or expired reset link");
        setLoading(false);
        return;
      }

      const res = await axios.post("/api/users/forgotpassword", {
        token,
        newPassword: password,
      });

      console.log("Password changed", res.data);
      toast.success("Password changed successfully");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong");
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisable(password.length === 0 || confirmPassword.length === 0);
  }, [password, confirmPassword]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>

        {loading && <p className="text-blue-500 text-center mb-2">Processing...</p>}

        <label htmlFor="password" className="block text-gray-700 font-medium">
          New Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
        />

        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || buttonDisable}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
      </div>
    </div>
  );
}
