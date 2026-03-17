import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../api";

export default function RegisterPage() {
  const [msg, setMsg] = useState("");
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    const res = await createNewUser(data);
    console.log(res)
    if (res && res.success) {
      setMsg("Created!");
      e.target.reset();
    } else {
      setMsg("User already exists");
    }
  };

  return (
    <div className="mx-auto p-10 ">
<button 
  onClick={() => navigate("/AdminPage")} 
  className="border border-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
>
  ← Admin Page
</button>


      <h2 className="text-2xl mb-8 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input 
          name="username" 
          placeholder="Username" 
          className="border-b pb-2 " 
          required 
        />
        <input 
          name="email" 
          type="text" 
          placeholder="Email" 
          className="border-b pb-2 " 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          className="border-b pb-2 " 
          required 
        />
        <input 
          name="user_type" 
          placeholder="User Type" 
          className="border-b pb-2 " 
          required 
        />

        <button 
          type="submit" 
          className="bg-black text-white py-3 text-xs font-bold"
        >
          Create
        </button>
        
        {msg && <p className=" text-center ">{msg}</p>}
      </form>
    </div>
  );
}
