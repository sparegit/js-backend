import axios from "axios";

const getOrders= async()=>{
    const response = await axios.get('http://localhost:5000/api/users/get-all-orders');
    return response.data;
}

const orderService ={
    getOrders,
}

export default orderService;