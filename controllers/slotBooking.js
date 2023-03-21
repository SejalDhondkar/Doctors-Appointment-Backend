const {currentUser} = require("../helpers/user");
const HistoryModel = require('../models/bookingHistory')
const SlotsModel = require("../models/slots");
const { slotStatus, appointmentStatus} = require("../helpers/enums");

module.exports = {

    addSlotInfo: async (req, res) => {
        const user = await currentUser(req, res);

        // TODO: Add a function which creates slots according to clinic info

        const slotInfo = await SlotsModel.find({doctorId: user._id})

        // sab delete kardo if exists and make new one else make new one directly

        if (slotInfo) {
            await SlotsModel.deleteMany({doctorId: user._id});
        }

        const {startTime, endTime, timePerSlot} = req.body;
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

    getAllSlots: async (req,res) => {
        const user = await currentUser(req, res);
        const slotInfo = await SlotsModel.find({doctorId: user._id});
        if (!slotInfo) return res.status(400).json({message: "No slots added."})
        return res.status(200).json(slotInfo);
    },

    disableSlot: async(req,res) => {
        const user = await currentUser(req, res);
        // user is doctor

        const slotInfo = await SlotsModel.findByIdAndUpdate(req.body.slotId, {status: slotStatus.DISABLED},{ "new": true});

        return res.status(200).json({
            message: "Slot disabled successfully",
            data: slotInfo
        });
    }
}