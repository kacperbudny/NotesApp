const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: String,
    content: String,
    displayOrder: Number,
    color: String
});

module.exports = mongoose.model('Note', noteSchema);