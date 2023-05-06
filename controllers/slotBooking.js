const {currentUser} = require("../helpers/user");
const HistoryModel = require('../models/bookingHistory')
const SlotsModel = require("../models/slots");
const DoctorInfoModel = require('../models/doctorInfo');
const { slotStatus, appointmentStatus} = require("../helpers/enums");

module.exports = {

    addSlotInfo: async (req, res) => {
        const user = await currentUser(req, res);

        const {start, end} = req.body;

        const docInfo = await DoctorInfoModel.findOneAndUpdate({userId: user._id}, {$set: {startTime: start, endTime: end}});

        const slotInfo = await SlotsModel.find({doctorId: user._id})

        // sab delete kardo if exists and make new one else make new one directly

        if (slotInfo) {
            await SlotsModel.deleteMany({doctorId: user._id});
        }

        let startTime = start;
        let endTime = end;
 
        const timePerSlot = 1;
        let counter = startTime;
        while (counter < endTime) {
            let newSlot = await SlotsModel.create({
                doctorId: user._id,
                startTime: counter + ':00',
                endTime: counter + timePerSlot + ':00',
                status: slotStatus.OPEN
            });
            counter += timePerSlot;
        }
        return res.status(200).json({
            message: "Slots added successfully"
        });
    },

    getDocSlots: async (req,res) => {
        const user = await currentUser(req, res);
        const slotInfo = await SlotsModel.find({doctorId: user._id});
        if (!slotInfo) return res.status(400).json({message: "No slots added."})
        return res.status(200).json(slotInfo);
    },

    getPatientSlots: async (req,res) => {
        const { docId } = req.body;
        const slotInfo = await SlotsModel.find({doctorId: docId});
        if (!slotInfo) return res.status(400).json({message: "No slots available."})
        return res.status(200).json(slotInfo);
    },

    disableSlot: async(req,res) => {
        const user = await currentUser(req, res);
        // user is doctor

        const slotInfo = await SlotsModel.findByIdAndUpdate(req.body.slotId, {status: slotStatus.DISABLED},{ "new": true});
        const slotInfoAll = await SlotsModel.find({doctorId: user._id});

        return res.status(200).json({
            message: "Slot disabled successfully",
            data: slotInfoAll
        });
    },

    enableSlot: async(req,res) => {
        const user = await currentUser(req, res);
        // user is doctor

        const slotInfo = await SlotsModel.findByIdAndUpdate(req.body.slotId, {status: slotStatus.OPEN},{ "new": true});

        const slotInfoAll = await SlotsModel.find({doctorId: user._id});
        return res.status(200).json({
            message: "Slot enabled successfully",
            data: slotInfoAll
        });
    },
}