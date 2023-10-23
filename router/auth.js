const express = require("express");
const AuthController =  require("../controllers/auth");

const api = express.Router();


//ENDPOINT to register user 
api.post("/auth/register", AuthController.register);


//ENDPOINT to verify the user who will log in
api.post("/auth/login", AuthController.login);

//END POINT to check if a user exists
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);

module.exports = api;