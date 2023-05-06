const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
{
	email: { type: String, required: true, unique: true },
	hash: { type: String, required: true },
	salt: { type: String },
	firstname: { type: String, required: true },
	lastname: { type: String },
	email_verified: { type: Boolean, required: true },
	mobile: { type: String },
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role"
	},
},
{ collection: 'users' }
)

module.exports = mongoose.model('User', UserSchema)