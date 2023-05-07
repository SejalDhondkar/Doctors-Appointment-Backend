const UserModel = require('../models/user')
const TreatmentModel = require('../models/treatment')
const { currentUser } = require('../helpers/user')
const { appointmentStatus } = require('../helpers/enums')
const HistoryModel = require('../models/bookingHistory')

module.exports = {

    addTreatmentHistory: async (req, res) => {
        const user = await currentUser(req,res);
        let treatment = await TreatmentModel.create({...req.body, doctorId: user._id});
        const updated = await HistoryModel.findOneAndUpdate({_id: req.body.historyId}, {$set:  { appointmentStatus: appointmentStatus.COMPLETED}})
        return res.status(200).json(treatment);
    },

    getTreatment: async (req, res) => {
        const treatment = await TreatmentModel.findOne({historyId: req.body.historyId}).populate('doctor').populate("patient").populate('doctorInfo').populate('appointmentInfo');
        // console.log(treatment);
        if(!treatment) return res.status(400).json({message: "No records found"})
        return res.status(200).json(treatment);
    },

    getPatientTreatment: async(req, res) => {
        const user = await currentUser(req,res);
        const patientTreatment = await TreatmentModel.findById({patientId: user._id}).sort('createdAt');
        if (!patientTreatment) return res.status(400).json({message: "No appointments booked"})

        return res.status(200).json(patientTreatment);
    },

    getDoctorTreatment: async(req, res) => {
        const user = await currentUser(req,res);
        const doctorTreatment = await TreatmentModel.findById({doctorId: user._id}).sort('createdAt');

        // TODO: Group the data wrt patients
        if (!doctorTreatment) return res.status(400).json({message: "No appointments booked"})

        return res.status(200).json(doctorTreatment);
    },

}