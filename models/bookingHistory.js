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
        startTime: { type: String },
        endTime: { type: String },
        appointmentStatus: { type: String },
        type: { type: String },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        link: { type: String}
        // TODO: cancellation policy here
        // status: { type: String }  // active - patient & doc upcoming slot OR cancelled OR completed
	},
	{ collection: 'bookingHistory' },
    { timestamps: true }
)

bookingHistorySchema.virtual('doctor', {
    ref: 'User', //The Model to use
    localField: 'doctorId', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
    options: {
        select: 'firstname lastname'
    }
});

bookingHistorySchema.virtual('patient', {
    ref: 'User', //The Model to use
    localField: 'patientId', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
    options: {
        select: 'firstname lastname'
    }
});

// Set Object and Json property to true. Default is set to false
bookingHistorySchema.set('toObject', { virtuals: true });
bookingHistorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('BookingHistory', bookingHistorySchema)