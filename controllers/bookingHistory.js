const HistoryModel = require('../models/bookingHistory')
const { currentUser } = require('../helpers/user')
const DoctorInfoModel = require("../models/doctorInfo");
const SlotModel = require("../models/slots");
const { slotStatus, appointmentStatus } = require('../helpers/enums')
const SlotsModel = require("../models/slots");

module.exports = {

    addBooking: async (req, res) => {
        const user = await currentUser(req,res);
        req.body.appointmentStatus = appointmentStatus.BOOKED;

        const slotId = req.body.slotId;
        delete req.body.slotId;

        let newHistory = await HistoryModel.create({...req.body, patientId: user._id});
        // await SlotModel.findByIdAndUpdate(slotId, {status: slotStatus.BOOKED});

        return res.status(200).json({
            message: "Information added",
            data: newHistory
        });
    },

    getPatientHistory: async(req, res) => {
        const user = await currentUser(req,res);
        const patientHistory = await HistoryModel.find({patientId: user._id}).sort('createdAt').populate('doctor');
        if (!patientHistory) return res.status(400).json({message: "No appointments booked"})

        return res.status(200).json(patientHistory);
    },

    getDoctorHistory: async(req, res) => {
        const user = await currentUser(req,res);
        const doctorHistory = await HistoryModel.find({doctorId: user._id}).sort('createdAt').populate('patient');

        // TODO: Group the data wrt patients
        if (!doctorHistory) return res.status(400).json({message: "No appointments booked"})

        return res.status(200).json(doctorHistory);
    },

    cancelBooking: async (req, res) => {
        // user is patient or doctor
        const bookId = req.body.bookingId;
        
        const booking = await HistoryModel.findByIdAndUpdate(bookId, {appointmentStatus: appointmentStatus.CANCELLED}, {"new": true});
        // console.log(booking);
        if(!booking){
            return res.status(400).json({message: "Invalid request"});
        }
        // const slotInfo = await SlotsModel.findByIdAndUpdate(req.body.slotId, {status: slotStatus.OPEN},{ "new": true});

        return res.status(200).json({
            message: "Appointment cancelled successfully"
        });
    }
}