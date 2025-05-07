import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    stylistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in minutes
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);