const onlineMeet = require("../controllers/onlineMeet");
const router = require("express").Router();

router.get("/getlink", onlineMeet.generateMeeting);
router.post("/savelink", onlineMeet.saveMeetingLink);

module.exports = router;
