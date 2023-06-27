import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: 'United States',
  },
  accountType: {
    type: String,
    default: 'customer',
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

export default mongoose.model('User', userSchema);
