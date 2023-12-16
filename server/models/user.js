const mongoose = require("mongoose");

const userSchema = new mongoose.Schema( {
    email: {
        type: String, required: true, max: 50, unique: true
    },
    username: {
        type: String, required: true, min: 5, max: 20, unique: true
    },
    password: {
        type: String, required: true, min: 8
    },
    isAvatarSet : {
        type: Boolean, default: false
    },
    avatarImg: {
        type: String,
        default: ""
    }
} );

module.exports = mongoose.model("Users", userSchema);