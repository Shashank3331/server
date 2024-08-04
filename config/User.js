const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    "course": String,
    "price": Number,
    "duration": Number
})

module.exports = mongoose.model('students',productSchema);

