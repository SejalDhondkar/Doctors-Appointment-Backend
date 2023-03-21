const user = require("../controllers/user");
const router = require("express").Router();

router.get("/", user.getUserProfile);
router.get("/profile", user.getUserInfo);
router.post("/profile", user.editUserInfo);

module.exports = router;
