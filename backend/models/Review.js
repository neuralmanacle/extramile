const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reviewerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    status: { type: String, default: 'Pending' },
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
});

module.exports = mongoose.model('Review', reviewSchema);