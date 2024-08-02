const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    content: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);