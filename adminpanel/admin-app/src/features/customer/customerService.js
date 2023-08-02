import axios from "axios";


const getUsers = async ()=>

{
    const response = await axios.get('http://localhost:5000/api/users/allUsers');
    
    return response.data;
}

const customerService ={
    getUsers,
}

export default customerService;