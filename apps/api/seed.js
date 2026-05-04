import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import { jobs } from './db.js';

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<db_password>')) {
      console.error('❌ ERROR: You must update the MONGO_URI in apps/api/.env with your real password first!');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    await connectDB();

    console.log('🗑️ Clearing existing data...');
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log('🌱 Seeding Jobs into MongoDB...');
    // The old db.js uses 'id' instead of '_id', but Mongoose handles 'id' virtually.
    // We should map 'id' to '_id' for a clean import, or just let Mongoose generate new ObjectIds.
    // Let's let Mongoose generate new ObjectIds, but we need to keep track if we have relationships.
    // Since mock applications rely on jobId, we should retain the original string IDs if possible,
    // OR we just seed the jobs, and let applications start empty. Starting applications empty is fine!

    const formattedJobs = jobs.map(j => {
      // Remove the old string 'id' so Mongoose can create a proper ObjectId
      const { id, ...jobData } = j; 
      return jobData;
    });

    const insertedJobs = await Job.insertMany(formattedJobs);
    console.log(`✅ Successfully seeded ${insertedJobs.length} jobs!`);
    
    console.log('🔌 Disconnecting from MongoDB...');
    await mongoose.connection.close();
    console.log('Done!');
    process.exit(0);

  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
