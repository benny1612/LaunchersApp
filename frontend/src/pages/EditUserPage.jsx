import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteUser, updateUser } from "../api.js";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [editUser, setEdituser] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteUser(id);
      if (response && response.success) {
        setMsg("user deleted");
      } else {
        setMsg("user not deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await updateUser(id, data);
    if (res && res.success) {
      setMsg("updated");
      setEdituser(false);
    } else {
      setMsg("not updated");
    }
  };

  return (
    <div className="p-10 font-sans">
      <button
        onClick={() => navigate("/AdminPage")}
  className="border border-black px-6 py-2 text-xs font-bold   hover:bg-black hover:text-white mb-2"
      >
        ← Admin Page
      </button>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setEdituser(true)} 
          className="bg-gray-200 px-6 py-2 text-sm"
        >
          Edit user
        </button>
        
        <button 
          onClick={handleDelete} 
          className="bg-red-500  px-6 py-2 text-sm"
        >
          Delete user
        </button>
      </div>

      {msg && <p className="mb-4 font-bold">{msg}</p>}

      {editUser && (
        <div className="max-w-md">
          <h2 className="text-2xl mb-6">Update Details</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              name="username"
              placeholder="Username"
              className="border-b pb-2 "
              
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="border-b pb-2 "
              
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="border-b pb-2 "
              
            />
            <input
              name="user_type"
              placeholder="User Type"
              className="border-b pb-2 "
              
            />

            <button
              type="submit"
              className="bg-black text-white py-3 text-xs font-bold "
            >
              Update User
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
