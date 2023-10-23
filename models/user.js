const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email:{
        type: String,
        unique: true,
    },
    password: String,
    active: Boolean,
});

module.exports = mongoose.model("User", UserSchema);