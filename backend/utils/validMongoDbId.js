const mongoose = require("mongoose")

const validateMongoDBID = (id=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new Error("not a valid mongodb ID")
})
module.exports = validateMongoDBID;