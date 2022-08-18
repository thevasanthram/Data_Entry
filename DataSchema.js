const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  bodyNumber: {
    type: Number,
    required: true,
  },
  categoryChosen: {
    type: String,
    required: true,
  },
  subCategoryChosen: {
    type: String,
    required: true,
  },
  defectArea: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('DataEntry', dataSchema);
