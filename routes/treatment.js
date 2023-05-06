const treatment = require("../controllers/treatment");
const router = require("express").Router();

router.post("/add", treatment.addTreatmentHistory);
router.get("/doc", treatment.getDoctorTreatment);
router.get("/pat", treatment.getPatientTreatment);
router.post("/get", treatment.getTreatment);

module.exports = router;
