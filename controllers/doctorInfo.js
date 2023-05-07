const UserModel = require('../models/user')
const DoctorInfoModel = require('../models/doctorInfo')
const SlotsModel = require('../models/slots')
const HistoryModel = require('../models/bookingHistory')
const { currentUser } = require('../helpers/user')
const { appointmentStatus } = require('../helpers/enums')

module.exports = {
    addDoctorInfo: async (req, res) => {
        const user = await currentUser(req,res);
        const doctorInfo = await DoctorInfoModel.findOne({userId: user._id});
        // console.log(doctorInfo);
        if (doctorInfo) {
            let updatedInfo = await DoctorInfoModel.findByIdAndUpdate(doctorInfo._id, {...req.body, userId: user._id});
            return res.status(200).json({
                message: "Information updated",
                data: updatedInfo
            });
        } else {
            let newInfo = await DoctorInfoModel.create({...req.body, userId: user._id});
            return res.status(200).json({
                message: "New Information added",
                data: newInfo
            });
        }
    },

    getDoctorInfo: async(req, res) => {
        const user = await currentUser(req,res);
        const doctorInfo = await DoctorInfoModel.findOne({userId: user._id});
        if (!doctorInfo) return res.status(400).json({message: "Information does not exists"})
        
        return res.status(200).json(doctorInfo);
    },


    getAllDocs: async (req, res) => {
        const doctorInfo = await DoctorInfoModel.find().populate({
            path: "userId",
            select: ['firstname','lastname', 'mobile']
        });

        return res.status(200).json(doctorInfo);
    },

    getAllMentalProfDocs: async (req, res) => {
        const doctorInfo = await DoctorInfoModel.find({mentalProf: true}).populate({
            path: "userId",
            select: ['firstname','lastname', 'mobile']
        });
        // console.log(doctorInfo);
        return res.status(200).json(doctorInfo);
    },

    getDocStats: async (req, res) => {
        const user = await currentUser(req,res);
        const totalCount = await HistoryModel.find({doctorId: user._id}).count();
        const bookedCount = await HistoryModel.find({doctorId: user._id, appointmentStatus: appointmentStatus.BOOKED}).count();
        const completedCount = await HistoryModel.find({doctorId: user._id, appointmentStatus: appointmentStatus.COMPLETED}).count();
        const cancelledCount = await HistoryModel.find({doctorId: user._id, appointmentStatus: appointmentStatus.CANCELLED}).count();
        const data = {
            totalCount,
            bookedCount,
            completedCount,
            cancelledCount
        }
        return res.status(200).json(data);
    },
}