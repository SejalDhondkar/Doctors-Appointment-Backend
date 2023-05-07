const doctorInfo = require("../controllers/doctorInfo");
const router = require("express").Router();

router.get("/doc", doctorInfo.getDoctorInfo);
router.post("/doc", doctorInfo.addDoctorInfo);
router.get("/all/docs", doctorInfo.getAllDocs);
router.get("/all/docs/mentalprof", doctorInfo.getAllMentalProfDocs);
router.get("/stats", doctorInfo.getDocStats);

module.exports = router;
