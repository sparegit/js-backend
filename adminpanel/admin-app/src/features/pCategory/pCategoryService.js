import axios from "axios";
import config from "../../app/utils/axiosconfig";


 const getPCategory = async()=>{
    const response= await axios.get('http://localhost:5000/api/category/',config)
    return response.data;
}

const pCategory = {
    getPCategory,
}

export default pCategory;