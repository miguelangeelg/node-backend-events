const jwt = require('jsonwebtoken');
require("dotenv").config();


const generateJWT = async(uid, name) => {
    return new Promise((resolve, reject) =>{
        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error){
                console.log(error);
                reject('No se pudo generar el token')
            }

            resolve(token);
        });

    }).then((response)=>{
        return response;
    })
}


module.exports = {
    generateJWT
}