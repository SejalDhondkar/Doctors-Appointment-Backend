const slotBooking = require("../controllers/slotBooking");
const bookingHistory = require("../controllers/bookingHistory");
const router = require("express").Router();

router.post("/", slotBooking.addSlotInfo);
router.get("/", slotBooking.getDocSlots);
router.post("/disable", slotBooking.disableSlot);
router.post("/enable", slotBooking.enableSlot);

// Patient
router.post("/all", slotBooking.getPatientSlots);
router.post("/cancel", bookingHistory.cancelBooking);
router.post("/add", bookingHistory.addBooking);


module.exports = router;
