const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constans");

const app = express();

//Import Routing
const chatRoutes = require("./router/chat");
const authRoutes =  require("./router/auth");

//Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Header HTTP - CORS
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`, chatRoutes)
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;