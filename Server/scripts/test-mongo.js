import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

const mask = (u) => {
  if (!u) return '(<no URI provided>)';
  try { return u.replace(/:\/\/([^@]+)@/, '://*****@'); } catch { return '(<masked>)'; }
}

if (!uri) {
  console.error('No MONGODB_URI or MONGO_URI found in environment. Check your .env file.');
  process.exit(1);
}

console.log('Testing MongoDB connection to', mask(uri));

(async () => {
  try {
    // Use a short connect timeout
    await mongoose.connect(uri, { connectTimeoutMS: 10000 });
    console.log('Connection successful');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
})();
