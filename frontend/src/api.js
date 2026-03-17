import axios from "axios";

export const getAllLaunchers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/api/launchers`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getLauncherById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/api/launchers/${id}`,
      {
        headers: { Authorization: token },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addLauncher = async (newLauncher) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:3000/api/launchers/`,
      newLauncher,
      { headers: { Authorization: token } },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLauncher = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:3000/api/launchers/${id}`,
      {
        headers: { Authorization: token },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Updatelauncher = async (id, updeteData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/api/launchers/${id}`,
      updeteData,
      { headers: { Authorization: token } },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      userData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewUser = async (newUser) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:3000/api/auth/register/create",
      newUser,
      { headers: { Authorization: token } },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (id, updateData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/api/auth/register/update/${id}`,
      updateData,
      { headers: { Authorization: token } },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:3000/api/auth/register/delete/${id}`,
      { headers: { Authorization: token } },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/api/auth/getUser`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/api/auth/getAllUsers`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const DestroyLauncher = async (id, isDestroyed) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/api/launchers/destroyed/${id}`,
      { destroyed: isDestroyed },
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
