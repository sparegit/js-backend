import axios from "axios";


const getBlogs = async ()=>

{
    const response = await axios.get('http://localhost:5000/api/blogs/all');
    
    return response.data;
}

const blogService ={
    getBlogs,
}

export default blogService;