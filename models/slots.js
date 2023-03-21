const mongoose = require('mongoose')

const SlotsSchema = new mongoose.Schema(
    {
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        startTime: { type: String },
        endTime: {type: String},
        status: { type: String }
	},
	{ collection: 'slots' }
)

module.exports = mongoose.model('Slots', SlotsSchema)