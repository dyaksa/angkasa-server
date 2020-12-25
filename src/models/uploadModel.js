const db = require("../Config/db");

module.exports = {
    uploadImageById: (id,data) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET ${data} WHERE iduser = ${id}`,(err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    }
}