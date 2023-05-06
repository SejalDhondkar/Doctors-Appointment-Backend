const { verify } = require("jsonwebtoken");
const UserModel = require('../models/user')

const currentUser =  async (req,res) => {
    let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let decoded = verify(token, process.env.JWT_SECRET);
            req.user = decoded.email;
            const user = await UserModel.findOne({ email: req.user }).populate({
            path: "role",
            select: ['name']
            });
            // console.log(user)
            return user 
        } 
}

module.exports = {currentUser} 