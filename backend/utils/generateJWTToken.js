// require('dotenv').config();
const JWT = require('jsonwebtoken');

const generateToken =({id})=>{
    return JWT.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1d",
    })
    
}
module.exports = generateToken

// const authenticateToken =(req,res,next)=>{
//     if(req?.headers?.authorization?.startsWith('Bearer')){
//         let token = req.headers.authorization.split(' ')[1];
//         try{
//             if(token){
//                 const decoded = JWT.verify(token,process.env.JWT_SECRET)
//                 console.log(decoded);
//             }
//         }catch(error){
//             throw new Error ('token expired , log in again')
//         }
        
//     }else{
//         throw new Error('there isa no token');
//     }
// }
// module.exports = authenticateToken