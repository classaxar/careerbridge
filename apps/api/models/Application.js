import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    jobId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Job', 
      required: true 
    },
    // For now we store user details directly (later can link to a User model)
    name: { type: String, required: true },
    email: { type: String, required: true },
    portfolio: { type: String, default: '' },
    coverNote: { type: String, default: '' },
    
    status: { 
      type: String, 
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'], 
      default: 'pending' 
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
