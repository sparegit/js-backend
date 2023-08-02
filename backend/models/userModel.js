const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
const crypto = require("crypto")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:false,
    },
    lastname:{
        type:String,
        required:false,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    pic:{
        type:String,
        required:false,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOftIujX6bkSoXINfyzhC1QUd493nq9BRI35myM13P9ma01vZK&s"
    },
    password:{
        type:String,
        required:true,
    },
    cart:{
        type:Array,
        default:{},
    },
    address:[{type: mongoose.Schema.Types.ObjectId, ref:"Address"}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    
},
{
    timestamps:true,

}
);
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.methods.createPasswordResteToken = async function (){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetToken = Date.now()+30*60*1000; //10min
    return resetToken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);