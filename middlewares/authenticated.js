const jwt = require("../utils/jwt");
 
function asureAuth(req, res, next){
    console.log(req.headers['content-type'])
    console.log(req.headers['user-agent'])

    console.log(req)
     //Verify the authenticity of the user
    if(!req.headers.authorization){
        res.status(403).send({msg: "La peticion no tiene la cabecera de autenticacion"})
    }

    const token = req.headers.authorization.replace("Bearer ", "")
    try {
        //Decode the token
        const payload = jwt.decoded(token);

        //Token expiration date
        const { exp } = payload;
        const currentData = new Date().getTime();   
        if(exp <= currentData){
            return res.status(400).send({msg: "El token ha expirado"})
        }
        //The payload is sent to user
        req.user = payload;
        next();

    } catch (error) {
        return res.status(400).send({msg: "Token invalido"})
    }
}

module.exports = {
    asureAuth,
}