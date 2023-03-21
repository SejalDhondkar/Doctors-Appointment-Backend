const slotBooking = require("../controllers/slotBooking");
const bookingHistory = require("../controllers/bookingHistory");
const router = require("express").Router();

router.post("/", slotBooking.addSlotInfo);
router.get("/", slotBooking.getAllSlots);
router.post("/disable", slotBooking.disableSlot);

// booking
router.post("/cancel", bookingHistory.cancelBooking);
router.post("/add", bookingHistory.addBookingHistory);


module.exports = router;
