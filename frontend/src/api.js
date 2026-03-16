import axios from "axios";
export const getAllLaunchers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/launchers`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getLauncherById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/launchers/${id}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addLauncher = async (newLauncher) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/launchers/`,
      newLauncher,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLauncher = async (id)=>{
    try{
        const response = await axios.delete(`http://localhost:3000/api/launchers/${id}`
           

        )
         return response.data
    } catch (error) {
    console.log(error);
  }
}
