const Messages = require("../models/message");
const crypto = require("crypto");

// set encryption algorithm
const algorithm = 'aes-256-cbc'
 
// private key
const key = "chit-chat-app-private-secret-key" // must be of 32 characters

module.exports.addMsg = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;

        // random 16 digit initialization vector
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encyptedMsg = cipher.update(message, "utf-8", "hex");
        encyptedMsg += cipher.final("hex");
    
        // convert the initialization vector to base64 string
        const base64data = Buffer.from(iv, 'binary').toString('base64');

        const data = await Messages.create({
            message: {text: encyptedMsg, iv: base64data},
            users: [from, to],
            sender: from,
        });

        if(data) 
            return res.json({msg: "Message added."});

        return res.json({msg: "Failed to add message."});
    }
    catch(err) {
        next(err);
    }
};

module.exports.getAllMsg = async (req, res, next) => {
    try {
        const {from, to} = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({updatedAt: 1});

        const projectedMessages = messages.map((msg) => {
            
            // convert initialize vector from base64 to buffer
            const iv = Buffer.from(msg.message.iv, 'base64');
            
            // decrypt the string using encryption algorithm and private key
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decryptedMsg = decipher.update(msg.message.text, "hex", "utf-8");
            decryptedMsg += decipher.final("utf8");

            return {
                fromSelf: msg.sender.toString() === from, 
                message: decryptedMsg,
            };
        });

        res.json(projectedMessages);
    }
    catch(err) {
        next(err);
    }
};