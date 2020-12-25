const { findUserById } = require("../models/userModel");
const _ = require("lodash");

module.exports = {
    getUserLogin: async (req,res) => {
        try {
            const id = req.iduser;
            const response = await findUserById(id);
            if(!_.isEmpty(response)){
                return res.status(200).send({
                    success: true,
                    status: 200,
                    message: `fetch user login success`,
                    data: response
                })
            }
            return res.status(204).send({
                success: false,
                status: 204,
                message: `fetch user login failed`,
                data: []
            })
        }catch(err){
            return res.status(500).send({
                success: false,
                status: 500,
                message: `internal server error: ${err.message}`,
                data: []
            })
        }
    },

    editUserLogin: async (req,res) => {
        try {
            const id = req.iduser;
            const data = Object.entries(req.body).map((item) => {
                return parseInt(item[1]) > 0
                ? `${item[0]} = ${item[1]}`
                : `${item[0]} = '${item[1]}'`;
            });
            console.log(data);
            return res.status(200).send({
                success: true,
                status: 200,
                message: `update data successfully`
            })
        }catch(err){
            return res.status(500).send({
                success: false,
                status: 500,
                message: `internal server error: ${err.message}`,
                data: []
            })
        }
    }
}