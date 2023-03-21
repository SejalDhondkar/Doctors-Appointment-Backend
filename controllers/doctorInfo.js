const UserModel = require('../models/user')
const DoctorInfoModel = require('../models/doctorInfo')
const SlotsModel = require('../models/slots')
const { currentUser } = require('../helpers/user')

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
    }
}