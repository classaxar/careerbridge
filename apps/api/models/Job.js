import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: 'Remote' },
    type: { 
      type: String, 
      required: true, 
      enum: ['internship', 'normal', 'senior'] 
    },
    stipend: { type: String, default: '' },
    salary: { type: String, default: '' },
    duration: { type: String, default: '' },
    experience: { type: String, default: '' },
    description: { type: String, default: '' },
    tags: { type: [String], default: [] },
    
    recruiterId: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['active', 'paused', 'closed'], 
      default: 'active' 
    },
    hot: { type: Boolean, default: false },
    applicants: { type: Number, default: 0 },
    
    logo: { type: String, default: '' },
    logoColor: { type: String, default: '#26a69a' },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Map _id to id to maintain compatibility with frontend
jobSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
