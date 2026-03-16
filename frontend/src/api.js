import axios from "axios";
export const getAllLaunchers = async ()=>{
    try{
        const response = await axios.get(`http://localhost:3000/api/launchers`)
        return response.data
    }
    catch(err){
        console.log(err)
    }
}
