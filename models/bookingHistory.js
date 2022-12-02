const mongoose = require('mongoose')

const bookingHistorySchema = new mongoose.Schema(
	{
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        illness: { type: String },
        // TODO: Confirm date and time type
        slot: {
            date: { type: Date },
            day: { type: String },
            time: { type: String }
        },
        appointmentStatus: { type: String },
        type: { type: String },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
	},
	{ collection: 'bookingHistory' },
    { timestamps: true }
)

module.exports = mongoose.model('BookingHistory', bookingHistorySchema)