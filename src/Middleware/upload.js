import multer from "multer";
import { imageFilter } from "../Helper/imageFilter";

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, "./public/images");
    //   },
    // filename: (req, file, cb) => {
    //     cb(null, `${file.fieldname}-${Date.now()}.png`);
    // },
});

const preUploadImage = (req,res,next) => {
    const upload = multer({
        storage: storage,
        fileFilter: imageFilter,
        limits: {fileSize: 5 * 10000 * 10000}
    }).single("photo");
    upload(req,res,(err) => {
        if(req.fileValidationError){
            return res.status(500).send({
                success: false,
                status: 500,
                message: err.message
              })
        }
        if(err instanceof multer.MulterError){
            return res.status(500).send({
              success: false,
              status: 500,
              message: err.message
            })
        }
        if(err){
            return res.status(500).send({
              success: false,
              status: 500,
              message: err.message
            })
        }
        return next();
    })
}

module.exports = {
    preUploadImage
}