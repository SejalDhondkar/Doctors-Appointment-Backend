const UserModel = require('../models/user')
const UserInfoModel = require('../models/userInfo')
const {currentUser} = require('../helpers/user')

module.exports = {
    getUserProfile: async (req,res) =>{
        const user = await currentUser(req,res);
        return res.status(200).json(user);
    },

    // TODO: merge add user and edit user
    addUserInfo: async (req, res) => {
        const user = await currentUser(req,res);
        const doesInfoExist = await UserInfoModel.find({userId: user._id});
        if (doesInfoExist) return res.status(400).json({message: "Information already exists"})
        
        const userInfo = await UserInfoModel.create({...req.body, userId: user._id});
        return res.status(200).json({
            message: "Information added",
            data: userInfo
        });
    },

    getUserInfo: async(req, res) => {
        const user = await currentUser(req,res);
        const userInfo = await UserInfoModel.find({userId: user._id});
        if (!userInfo) return res.status(400).json({message: "Information does not exists"})
        
        return res.status(200).json(userInfo);
    },

    editUserInfo: async (req, res) => {
        const user = await currentUser(req,res);
        let userInfo = await UserInfoModel.find({userId: user._id});
        if (!userInfo) return res.status(400).json({message: "Information does not exists"})
        
        userInfo = await UserInfoModel.findByIdAndUpdate(userInfo._id, {...req.body, userId: user._id});
        return res.status(200).json({
            message: "Information added",
            data: userInfo
        });
    },
}