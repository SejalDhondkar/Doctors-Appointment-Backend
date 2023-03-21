const bookingHistory = require("../controllers/bookingHistory");
const router = require("express").Router();

// booking
router.post("/cancel", bookingHistory.cancelBooking);
router.post("/add", bookingHistory.addBooking);
router.get("/patient", bookingHistory.getPatientHistory);
router.get("/doctor", bookingHistory.getDoctorHistory);

module.exports = router;
