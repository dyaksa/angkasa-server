import { postRegister, findByUsername, findByEmail, findAndUpateById, findById} from "../models/authModel";
import jwt from "jsonwebtoken";
import _ from "lodash";

module.exports = {
    register: async (req,res) => {
        try {
           const data = {...req.body, role: 7};
           const response = await postRegister(data);
           if(response.affectedRows){
            return res.status(201).send({
                success: true,
                status: 201,
                errors: [],
                message: "successful register user",
                data: response
            })
           }
           return res.status(200).send({
               success: false,
               status: 200,
               errors: [],
               message: "failed register user",
               data: []
           })
        }catch(err){
            return res.status(500).send({
                success: false,
                status: 500,
                message: `internal server error: ${err.message}`
            })
        }
    },

    login: async (req,res) => {
        try{
            const { username } = req.body;
            const response = await findByUsername(username);
            const token = jwt.sign(
                {
                    iduser: response[0].iduser,
                    email: response[0].email,
                    username: response[0].username,
                    role: response[0].role
                }, process.env.SECRET_KEY
            )
            if(!_.isEmpty(response)){
                return res.status(200).send({
                    success: true,
                    status: 200,
                    errors: [],
                    accessToken: token,
                    message: `successfully login`
                })
            }
        }catch(err){
            return res.status(500).send({
                success: false,
                status: 500,
                message: `internal server error: ${err.message}`
            })
        }
    },

    forgot: async (req,res) => {
        try {
            const { email } = req.body;
            const response = await findByEmail(email);
            if(!_.isEmpty(response)){
                return res.status(200).send({
                    success: true,
                    status: 200,
                    message: `email founded`,
                    errors: [],
                    data: [
                        {
                            iduser: response[0].iduser,
                            email: response[0].email,
                            username: response[0].username
                        }
                    ]
                })
            }
        }catch(err){
            return res.status(500).send({
                success: false,
                status: 500,
                message: `internal server error : ${err.message}`,
                data: []
            })
        }
    },

    reset: async (req,res) => {
        try {
            const { id } = req.params;
            const user = await findById(id);
            if(!_.isEmpty(user)){
                const response = await findAndUpateById(id, req.body);
                if(response.affectedRows){
                    return res.status(201).send({
                        success: true,
                        status: 201,
                        errors: [],
                        message: `successfully update password user`,
                        data: response
                    })
                }
            }
            return res.status(200).send({
                success: false,
                status: 200,
                errors: [],
                message: `iduser canot found`,
                data: []
            })
        }catch(err){
            return res.status(500).send({
                success: false,
                status: 500,
                message: `internal server error : ${err.message}`,
                data: []
            })
        }
    }
}