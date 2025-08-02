const User = require('../models/User');
const Message = require('../models/Message');

module.exports = function(io) {
  io.on('connection', socket => {
    // Join the global network
    socket.on('join-network', async ({ username }) => {
      const user = await User.findOne({ username });
      if (user) {
        user.isOnline = true;
        user.socketId = socket.id;
        await user.save();
      }
      const users = await User.find({});
      io.emit('update-users', users);
    });

    // Join a room
    socket.on('join-room', room => {
      socket.join(room);
    });

    // Global chat message
    socket.on('global-message', async ({ senderId,senderName, content, room }) => {
      if (!room) room = "Lounge";
      const msg = await Message.create({ senderId,senderName, content, room });
      io.to(room).emit('global-message', msg);
    });

    // Private 1-to-1 message
    socket.on('private-message', async ({ senderId, receiverId, content }) => {
      // Generate room name as deterministic combo (for example)
      const room = [senderId, receiverId].sort().join('_');
      const msg = await Message.create({ senderId, receiverId, content, room });
      io.to(room).emit('private-message', msg);
    });

    // Track disconnect
    socket.on('disconnect', async () => {
      await User.updateOne({ socketId: socket.id }, { isOnline: false });
      const users = await User.find({});
      io.emit('update-users', users);
    });
  });
};
