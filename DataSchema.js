const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  optionChosen: {
    type: String,
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
});

module.exports = mongoose.model('DataEntry', dataSchema);
