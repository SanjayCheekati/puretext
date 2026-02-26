import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
    maxlength: 100
  },
  email: {
    type: String,
    default: '',
    maxlength: 200
  },
  type: {
    type: String,
    enum: ['feature', 'bug', 'improvement', 'other'],
    default: 'feature'
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
