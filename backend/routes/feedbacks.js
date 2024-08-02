const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
    const { reviewId, content } = req.body;
    try {
        let feedback = new Feedback({ reviewId, content });
        await feedback.save();
        res.json(feedback);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;