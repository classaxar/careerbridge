import mongoose from 'mongoose';
import dns from 'dns';

// Bypass local ISP/Windows DNS issues that cause 'querySrv ECONNREFUSED'
// by forcing Node.js to use Google's public DNS to resolve the MongoDB Atlas URL.
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (err) {
  // Ignore if unable to set
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
