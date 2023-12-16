const { addMsg, getAllMsg } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmsg/", addMsg);
router.post("/getAllmsg/", getAllMsg);

module.exports = router;