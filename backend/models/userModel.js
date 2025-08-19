const mongoose = require('mongoose');

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  randomString: String
});

module.exports = mongoose.model('User', userSchema);