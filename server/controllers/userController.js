const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const {email, username, password, avatarImg} = req.body;

        const emailCheck = await User.findOne( {email} );
        if(emailCheck) {
            return res.json({msg: "Email already registered", status: false});
        }

        const usernameCheck = await User.findOne( {username} );
        if(usernameCheck) {
            return res.json({msg: "Username already taken", status: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        delete user.password;
        return res.json({status: true, user});
    }
    catch(err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne( {username} );
        if(!user) {
            return res.json({msg: "Incorrect username or password", status: false});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.json({msg: "Incorrect username or password", status: false});
        }
    
        delete user.password;
        return res.json({status: true, user});
    }
    catch(err) {
        next(err);
    }
};

module.exports.setProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImg = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarSet: true,
            avatarImg,
        }, { new: true }
        );

        return res.json({
            isSet: userData.isAvatarSet,
            image: userData.avatarImg,
        });
    }
    catch (err) {
        next(err);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "email", "username", "avatarImg", "_id", "isAvatarSet",
        ]);

        return res.json(users);
    }
    catch (err) {
        next(err);
    }
};