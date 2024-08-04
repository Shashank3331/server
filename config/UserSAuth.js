const mongoose = require('mongoose');

const SignupSchema = mongoose.Schema({
    "name": String,
    "email": String,
    "password": String
})

module.exports = mongoose.model('users',SignupSchema);