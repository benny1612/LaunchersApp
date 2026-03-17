import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getAllUsers();
      if (data) {
        if (data.allUsers) {
          setUsers(data.allUsers);
        }
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="p-5">
        <button 
  onClick={() => navigate("/AdminPage")} 
  className="border border-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
>
  ← Admin Page
</button>
      {users && (
        <div>
          <h2 className="text-xl p-5">Users</h2>

          <div className="flex flex-col gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center border p-5"
              >
                <div>
                  <p>Name : {user.username}</p>
                  <p>Type: {user.user_type}</p>
                  <p>Email: {user.email}</p>
                  <p>login last {user.login_last}</p>
                </div>

                <button
                  onClick={() => navigate("/editUser/" + user._id)}
                  className="bg-gray-200 px-4 py-1 text-sm hover:bg-gray-300"
                >
                  Edit or delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
