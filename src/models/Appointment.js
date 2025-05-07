import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    stylistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);