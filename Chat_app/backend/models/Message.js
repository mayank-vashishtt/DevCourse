const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Null for global
  room: String, // e.g., "Lounge" or private room ID
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
