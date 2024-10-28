const express = require('express');
const router = express.Router();
const Serie = require('../models/Serie');

// Add a new serie
router.post('/add', async (req, res) => {
    try {
        const newSerie = new Serie(req.body);
        await newSerie.save();
        res.status(201).json(newSerie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all series
router.get('/', async (req, res) => {
    try {
        const seriesList = await Serie.find();
        res.json(seriesList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update a serie by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedSerie = await Serie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedSerie) return res.status(404).json({ error: 'Serie not found' });
        res.json(updatedSerie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a serie by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSerie = await Book.findByIdAndDelete(req.params.id);
        if (!deletedSerie) return res.status(404).json({ error: 'Serie not found' });
        res.json({ message: 'Serie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;