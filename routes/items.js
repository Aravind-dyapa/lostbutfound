const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Claim item
router.put('/:id/claim', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { claimed: true }, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
