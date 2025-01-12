const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // ... other user fields
  email: { type: String, required: true, unique: true },
  // ...
});

module.exports = mongoose.model('User', userSchema);