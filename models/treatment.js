const mongoose = require('mongoose')

const TreatmentSchema = new mongoose.Schema(
	{
        historyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BookingHistory',
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        prescription: [{ type: String }],
        remarks: { type: String },
        //TODO: Figure out doc upload type
        reports: { type: Array },
        fees: { type: String },
	},
	{ collection: 'treatment' }
)

module.exports = mongoose.model('Treatment', TreatmentSchema)