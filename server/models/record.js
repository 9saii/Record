const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
