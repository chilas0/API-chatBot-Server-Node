const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constans");

//To create an access token, for a 3 hour login

function createAccessToken(user){
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    //The object that goes inside the token
    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }
    //We return to generate the token
    return jwt.sign(payload, JWT_SECRET_KEY);
};

//Token refresh
function createRefreshToken(user){
    const expToken = new Date();
    expToken.getMonth(expToken.getMonth() + 1)

    //The object that goes inside the token
    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }
     //We return to generate the token
    return jwt.sign(payload, JWT_SECRET_KEY);
};

 //Decode the token
function decoded(token){
    return jwt.decode(token, JWT_SECRET_KEY, true);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded,
};