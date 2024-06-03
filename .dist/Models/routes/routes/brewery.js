const router = require('express').Router();
const axios = require('axios');
const Review = require('../models/Review');
const authMiddleware = require('../middleware/auth');

// Search breweries by city, name, or type
router.get('/search', async (req, res) => {
    const { by_city, by_name, by_type } = req.query;
    let url = `https://api.openbrewerydb.org/breweries?`;

    if (by_city) url += `by_city=${by_city}&`;
    if (by_name) url += `by_name=${by_name}&`;
    if (by_type) url += `by_type=${by_type}&`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get brewery details and reviews
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries/${req.params.id}`);
        const reviews = await Review.find({ breweryId: req.params.id }).populate('userId', 'username');
        res.json({ brewery: response.data, reviews });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a review
router.post('/:id/reviews', authMiddleware, async (req, res) => {
    try {
        const { rating, description } = req.body;
        const review = new Review({
            breweryId: req.params.id,
            userId: req.user.userId,
            rating,
            description,
        });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
