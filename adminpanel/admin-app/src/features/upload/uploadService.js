import axios from "axios";
import config from "../../app/utils/axiosconfig";

const uploadImg = async(data)=>{
    const response = await axios.post('http://localhost:5000/api/upload',data,config);
    return response.data;
}
const delImg = async(id)=>{
    const response = await axios.delete(`http://localhost:5000/api/upload/delete-img/${id}`,config);
    return response.data
}
const uploadService ={
    uploadImg,
    delImg,
    
}
export default uploadService;
