const express = require("express");
const ChatController = require("../controllers/chat");
const md_auth = require("../middlewares/authenticated")

const api = express.Router();

api.post("/chat/send", [md_auth.asureAuth], ChatController.send);

module.exports = api;