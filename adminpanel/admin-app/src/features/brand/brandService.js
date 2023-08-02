import axios from "axios";
import config from "../../app/utils/axiosconfig";


const getBrands = async ()=>

{
    const response = await axios.get('http://localhost:5000/api/brand/',config);
    
    return response.data;
}

const brandService ={
    getBrands,
}

export default brandService;