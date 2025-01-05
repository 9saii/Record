const express = require('express');
const router = express.Router();
const Record = require('../models/record');

// Create a new record
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const newRecord = new Record({ name, email, phone, message });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
