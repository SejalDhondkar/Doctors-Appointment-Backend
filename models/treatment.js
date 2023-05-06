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
        prescription: {type: String} ,
        complaint: {type: String},
        remarks: { type: String },
        //TODO: Figure out doc upload type
        reports: { type: Array },
        fees: { type: String },
	},
	{ collection: 'treatment' }
);

TreatmentSchema.virtual('doctorInfo', {
    ref: 'DoctorInfo', //The Model to use
    localField: 'doctorId', //Find in Model, where localField 
    foreignField: 'userId', // is equal to foreignField
    options: {
        select: 'degree specialization registrationNo clinicName clinicAddr'
    }
});

TreatmentSchema.virtual('patient', {
    ref: 'User', //The Model to use
    localField: 'patientId', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
    options: {
        select: 'firstname lastname'
    }
});

TreatmentSchema.virtual('doctor', {
    ref: 'User', //The Model to use
    localField: 'doctorId', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
    options: {
        select: 'firstname lastname'
    }
});

TreatmentSchema.virtual('appointmentInfo', {
    ref: 'BookingHistory', //The Model to use
    localField: 'historyId', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
    options: {
        select: 'startTime endTime date'
    }
});

// Set Object and Json property to true. Default is set to false
TreatmentSchema.set('toObject', { virtuals: true });
TreatmentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Treatment', TreatmentSchema)