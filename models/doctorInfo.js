const mongoose = require('mongoose')

const DoctorInfoSchema = new mongoose.Schema(
	{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        degree: { type: String },
        college: { type: String },
        experience: { type: String },
        specialization: { type: String },
        registrationNo: { type: String },
        // ^ Doctor info
        // Clinic info
        clinicName: { type: String },
        clinicAddr: { type: String },
        startTime: { type: String },
        endTime: { type: String },
        timePerSlot: { type: String },
        firstFees: { type: String },
        followupFees: { type: String },
	},
	{ collection: 'doctorsInfo' }
)

module.exports = mongoose.model('DoctorInfo', DoctorInfoSchema)