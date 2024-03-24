import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from 'socket.io';

import { PORT } from '@/config/const';
import { connectToMongo } from '@/config/db';
import { mainErrorHandler, notFound, syntaxErrorHandler } from '@/middleware/errors';
import { chatRoutes } from '@/routes/chat';
import { messageRoutes } from '@/routes/message';
import { userRoutes } from '@/routes/user';
import type { IMessage, IMessageDocument, IUserDocument } from '@/types';

// create express app
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

app.get('/test', (_req: Request, res: Response) => {
  res.send('👋 Express server!');
});

// Error Handling middlewares
app.use(syntaxErrorHandler);
app.use(mainErrorHandler);
app.use(notFound);

// Start express server
const server = app.listen(PORT, async () => {
  await connectToMongo();
  console.log(`👋 Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/test`);
});

// Create socket.io server
const io = new Server(server, {
  pingInterval: 10000,
  pingTimeout: 60000,
});

// Socket.io events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('ping', (data) => {
    console.log(`Ping received with data: ${data}`);
    socket.emit('pong', 'PONG');
  });

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room: string) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });

  socket.on('typing', (room: string) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room: string) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageReceived: IMessageDocument) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user: IUserDocument) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived);
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
