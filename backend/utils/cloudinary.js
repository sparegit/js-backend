const cloudinary = require('cloudinary');


// Configuration 
cloudinary.config({
  cloud_name: "dfyyr1syp",
  api_key: "738222642294175",
  api_secret: "ijCsJ4mq1HLIMMcOok2FAT5_R_E"
});

const cloudinaryUploadImg = async (filetoupload)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(filetoupload,(result)=>{
            resolve(
                {
                    url : result.secure_url,
                    asset_id : result.asset_id,
                    public_id : result.public_id
                },
                {
                    resource_type: "auto",
                }
            )
        })
    })
}
const cloudinaryDeleteImg = async (filetoDelete)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.destroy(filetoDelete,(result)=>{
            resolve(
                {
                    url : result.secure_url,
                    asset_id : result.asset_id,
                    public_id : result.public_id
                },
                {
                    resource_type: "auto",
                }
            )
        })
    })
}
module.exports = {cloudinaryUploadImg,cloudinaryDeleteImg}