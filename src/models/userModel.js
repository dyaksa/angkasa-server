import db from "../Config/db";

module.exports = {
    findUserById: (id) => {
        return new Promise((resolve,reject) => {
            db.query(`SELECT * FROM users WHERE iduser = ${id}`,(err, result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    udpateById: (id,data) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET ${data} WHERE id = ${id}`,(err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    }
}