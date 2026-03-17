import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userInfo = { username, password };

    try {
      const data = await login(userInfo);
      if (data && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleLogin} className="mt-5">
        <h2 className="text-2xl text-center">Login</h2>

        <div className="space-y-7">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className=" w-full border-b"
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b"
            required
          />

          <button type="submit" className="w-50  bg-black text-white p-5">
            SIGN IN
          </button>
        </div>
      </form>
    </div>
  );
}
