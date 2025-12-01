import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  data: {
    version: {
      type: Number,
      default: 1
    },
    salt: {
      type: String,
      required: true
    },
    iv: {
      type: String,
      required: true
    },
    ciphertext: {
      type: String,
      required: true
    }
  },
  deleteTokenHash: {
    type: String,
    required: true
  },
  deleteToken: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false,
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
