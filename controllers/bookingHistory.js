const HistoryModel = require('../models/bookingHistory')
const { currentUser } = require('../helpers/user')
const DoctorInfoModel = require("../models/doctorInfo");
const { appointmentStatus } = require('../helpers/enums')

module.exports = {

    addBookingHistory: async (req, res) => {
        const user = await currentUser(req,res);
        req.appointmentStatus = appointmentStatus.BOOKED;
        let newHistory = await HistoryModel.create({...req.body, patientId: user._id});
        return res.status(200).json({
            message: "Information added",
            data: newHistory
        });
    },

    getPatientHistory: async(req, res) => {
        const user = await currentUser(req,res);
        const patientHistory = await HistoryModel.findById({patientId: user._id}).sort('createdAt');
        if (!patientHistory) return res.status(400).json({message: "No appointments booked"})

        return res.status(200).json(patientHistory);
    },

    getDoctorHistory: async(req, res) => {
        const user = await currentUser(req,res);
        const doctorHistory = await HistoryModel.findById({doctorId: user._id}).sort('createdAt');

        // TODO: Group the data wrt patients
        if (!doctorHistory) return res.status(400).json({message: "No appointments booked"})

        return res.status(200).json(doctorHistory);
    },

    // TODO: Add cancel appointment method

}