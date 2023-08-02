import axios from "axios";
import config from "../../app/utils/axiosconfig";


const getColors = async ()=>

{
    const response = await axios.get('http://localhost:5000/api/color/',config);
    
    return response.data;
}

const colorService ={
    getColors,
}

export default colorService;