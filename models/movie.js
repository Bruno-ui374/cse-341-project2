const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    duration: { type: Number, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    description: { type: String, required: true }
  },
  {
    timestamps: { createdAt: false, updatedAt: true }
  }
);

module.exports = mongoose.model('Movie', movieSchema);