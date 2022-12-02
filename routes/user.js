const user = require("../controllers/user");
const router = require("express").Router();

router.get("/", user.getUserProfile);

module.exports = router;
