const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// GET /api/messages/:id
router.get('/messages/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // If global room, fetch all in room
  if (id === 'Lounge') {
    const messages = await Message.find({ room: 'Lounge' }).sort('timestamp');
    return res.json(messages);
  }

  // For private chat: only messages between the logged-in user and the other party
  const messages = await Message.find({
    $or: [
      { senderId: userId, receiverId: id },
      { senderId: id, receiverId: userId }
    ]
  }).sort('timestamp');
  res.json(messages);
});

module.exports = router;
