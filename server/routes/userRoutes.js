const { register, login, setProfile, getAllUsers } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setProfile/:id", setProfile);
router.get("/allUsers/:id", getAllUsers);

module.exports = router;