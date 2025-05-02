import mongoose from 'mongoose';

const replacementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },

  reason: { type: String, required: true },
  quantity:{ type:Number , required:true},
  status: {
    type: String,
    enum: ['requested', 'approved', 'rejected', 'completed'],
    default: 'requested',
  },

  requestedAt: { type: Date, default: Date.now },
  resolvedAt:  { type: Date, default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
});
delete mongoose.models.Replacement
export default mongoose.models.Replacement || mongoose.model('Replacement', replacementSchema);
