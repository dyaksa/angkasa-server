import { uploadImageById } from "../models/uploadModel";
const cloudinary = require("../Helper/cloudinary");

module.exports = {
    postUploadImage: async (req,res) => {
        try{
            if(req.file){
                const id = req.iduser;
                const image = (await cloudinary.uploader.upload(req.file.path)).secure_url
                const data = Object.entries({ photo: image }).map((item) => {
                    return parseInt(item[1]) > 0
                    ? `${item[0]} = ${item[1]}`
                    : `${item[0]} = '${item[1]}'`;
                });
                const response = await uploadImageById(id,data);
                if(response.affectedRows){
                    return res.status(201).send({
                        success: true,
                        status: 201,
                        errors: [],
                        message: `successfully uplaod image`
                    });
                }
            }
            return res.status(403).send({
                success: false,
                status: 403,
                errors: [
                    {
                        "photo": "photo must be filled"
                    }
                ],  
            })
        }catch(err){
            return res.status(500).send({
                success: false,
                status: 500,
                message: `internal server error : ${err.message}`
            })
        }
    }
}