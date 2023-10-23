const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res){
    const { email, password } = req.body;

     //It is validated if the email comes empty
    if(!email) res.status(400).send({msg: "El email es obligatorio."});
    if(!password) res.status(400).send({msg: "La contraseña es obligatoria."});

    //Create the user object
    const user = new User({
        email: email.toLowerCase(),
        active: true,
        password,
    });

    //Encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    user.save()
    .then((userStorage, error) => {
        if(error){
            res.status(400).send({msg: error});
        }else{
            res.status(200).send(userStorage);
        }
    })
    .catch((error) => {
        console.error('Error al guardar el documento:', error);
    });
}

 
async function login(req, res){

    try {
        const { email, password } = req.body;
        if(!email) res.status(400).send({msg: "The email is required"});
        if(!password) res.status(400).send({msg: "The password is required"});
        const emailLowerCase = email.toLowerCase();
        const result = await User.findOne({email: emailLowerCase})
        if(!result){
            //If the user not found 
            res.status(400).send({msg: "User not found"})
        }else{
            //If exist the user it compares the password
            bcrypt.compare(password, result.password, (bcryptError, check) => {
                //It has a server error
                if(bcryptError){
                    res.status(500).send({msg: "Server error"});
                //If the password is incorrect
                }else if(!check){
                    res.status(500).send({msg: "Incorrect password"});
                //If the credentials is good 
                }else{
                    //It return the jwt token 
                    res.status(200).send({
                        access: jwt.createAccessToken(result),
                        refresh: jwt.createRefreshToken(result),
                    });
                }
            });
        }
    } catch (error) {
        console.log("error")
        res.status(500).send({msg: "error",error})
    }
}
//End login

function refreshAccessToken(req, res){
    const { token } = req.body;
    if(!token) res.status(400).send({msg: "Token requerido"});

    //decoded is called and the user_id is obtained
    const { user_id } = jwt.decoded(token);

    //Search for a user in the DB
    User.findOne({ _id: user_id}, (error, userStorage) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else{
            res.status(200).send({
                //If there is no error, a new accessToken is created
                accessToken: jwt.createAccessToken(userStorage),
            });

        }
    })
}

//Estamos expoprtando la funcion 
module.exports = {
    register,
    login,
    refreshAccessToken,
};