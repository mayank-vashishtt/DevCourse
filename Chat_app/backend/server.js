require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const socketHandler = require('./socket/socketHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', messageRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// JWT authentication for Socket.io
const { verifyToken } = require('./utils/jwt');
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  try {
    socket.user = verifyToken(token);
    next();
  } catch (e) {
    next(new Error('Authentication failed'));
  }
});

socketHandler(io);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
