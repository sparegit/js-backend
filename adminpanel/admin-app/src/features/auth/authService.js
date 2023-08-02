import axios from "axios";
import {base_url} from "../../app/utils/base_url"
import config from "../../app/utils/axiosconfig";
const login = async (userData)=>

{
    const response = await axios.post('http://localhost:5000/api/user/admin-login',userData);
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }
    return response.data;
}
const getOrders = async()=>{
    const response = await axios.get('http://localhost:5000/api/user/getallorders',config);
    return response.data;
}

const authService ={
    login,
    getOrders
}

export default authService;