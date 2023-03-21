const mongoose = require('mongoose')

const bookingHistorySchema = new mongoose.Schema(
	{
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        illness: { type: String },
        // TODO: Confirm date and time type
        slotId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Slots',
        },
        date: { type: String },
        time: { type: String },
        appointmentStatus: { type: String },
        type: { type: String },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        // TODO: cancellation policy here
        // status: { type: String }  // active - patient & doc upcoming slot OR cancelled OR completed
	},
	{ collection: 'bookingHistory' },
    { timestamps: true }
)

module.exports = mongoose.model('BookingHistory', bookingHistorySchema)