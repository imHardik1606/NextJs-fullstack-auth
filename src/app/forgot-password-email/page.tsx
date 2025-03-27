"use client";

import axios from "axios";
import { useState } from "react";

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/users/forgotpasswordemail", { email });
      setMessage(res.data.message || "Reset link sent successfully!");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="email" className="p-2">
        Enter your Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Send Reset Link
      </button>
      {message ? message : ""}
    </div>
  );
}
