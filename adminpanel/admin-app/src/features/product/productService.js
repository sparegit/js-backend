import axios from "axios";
import config from "../../app/utils/axiosconfig";


const getProducts = async ()=>

{
    const response = await axios.get('http://localhost:5000/api/products/allproduct');
    
    return response.data;
}
const createProduct = async(product)=>{
    console.log(product);
    const response = await axios.post('http://localhost:5000/api/product/',product,config);
    return response.data;
}

const productService ={
    getProducts,
    createProduct,
}

export default productService;