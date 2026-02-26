import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 100,
    validate: {
      validator: function(v) {
        // Only allow alphanumeric and hyphens
        return /^[a-z0-9-]+$/i.test(v);
      },
      message: 'Note name can only contain letters, numbers, and hyphens'
    }
  },
  data: {
    version: {
      type: Number,
      default: 1
    },
    salt: {
      type: String,
      required: true,
      maxlength: 100
    },
    iv: {
      type: String,
      required: true,
      maxlength: 100
    },
    ciphertext: {
      type: String,
      required: true,
      maxlength: 5 * 1024 * 1024 // 5MB max
    }
  },
  deleteTokenHash: {
    type: String,
    required: true
  },
  hasUserPassword: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: null
  }
}, {
  _id: false,
  timestamps: true
});

// Add indexes for better query performance
noteSchema.index({ createdAt: 1 });
noteSchema.index({ updatedAt: 1 });
// TTL index: MongoDB automatically deletes documents when expiresAt is reached
noteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, sparse: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;
