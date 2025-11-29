// LearnSphere/backend/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5 // Minimum title length
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10 // Minimum description length
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',           // add this
      required: true,
    },
    videoLinks: [
      {
        type: String,
        trim: true
      }
    ],
    price: { 
      type: Number, 
      required: true, 
      default: 0 
    },
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Course', courseSchema);
