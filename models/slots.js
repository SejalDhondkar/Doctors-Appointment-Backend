const mongoose = require('mongoose')

const SlotsSchema = new mongoose.Schema(
	{
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        day: { type: String },
        timeslot: { type: String },
        status: { type: String },
        disabledFor: [{ type: String }],
	},
	{ collection: 'slots' }
)

module.exports = mongoose.model('Slots', SlotsSchema)