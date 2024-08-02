const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    try {
        let review = new Review({ title, description });
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    try {
        let review = await Review.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        res.json(review);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.post('/:id/assign', async (req, res) => {
    const { reviewerIds } = req.body;
    try {
        let review = await Review.findById(req.paarams.id);
        review.reviewerIds = reviewerIds;
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.get('/assigned', async (req, res) => {
    const { employeeId } = req.query;

    try {
        const reviews = await Review.find({ reviewerIds: employeeId });
        res.json(reviews);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
