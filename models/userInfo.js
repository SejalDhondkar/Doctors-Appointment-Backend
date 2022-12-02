const mongoose = require('mongoose')

const UserInfoSchema = new mongoose.Schema(
	{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
		address: { type: String},
		country: {
            id: Number,
            name: String,
            iso2: String
        },
        state: { 
            id: Number,
            name: String,
            iso2: String
        },
        city: { 
            id: Number,
            name: String,
        },
        pincode: { type: Number },
        languages: [{ type: String }],
        dob: { type: String },
        updatedAt: Date
	},
	{ collection: 'usersInfo' }
)

module.exports = mongoose.model('UserInfo', UserInfoSchema)