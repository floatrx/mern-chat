import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from 'socket.io';

import { PORT } from '@/config/const';
import { connectToMongo } from '@/config/db';
import { mainErrorHandler, notFound, syntaxErrorHandler } from '@/middleware/errors';
import { userRoutes } from '@/routes/user';

// create express app
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

app.get('/test', (_req: Request, res: Response) => {
  res.send('👋 Express server!');
});

// Error Handling middlewares
app.use([notFound, syntaxErrorHandler, mainErrorHandler]);

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

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
