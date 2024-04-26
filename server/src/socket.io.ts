import { Server } from 'socket.io';

import type { IMessageDocument, IUserDocument, TServerInstance } from '@/types';

/**
 * Create and returns socket.io server instance
 * @param server
 */
export const initSocketIo = (server: TServerInstance) => {
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

  return io;
};
