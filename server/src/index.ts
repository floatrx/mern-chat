import cors from 'cors';
import express from 'express';
import { PORT } from '@/config/const';
import { appRoutes } from '@/routes';

import { connectToMongo } from '@/lib/db';
import { initSocketIo } from '@/socket.io';

import { mainErrorHandler, notFound, syntaxErrorHandler } from '@/middleware/errors';

// Create express app
const app = express();

// Main middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', appRoutes);

// Error Handling middlewares
app.use(mainErrorHandler);
app.use(syntaxErrorHandler);
app.use(notFound);

// Start express server
const expressServer = app.listen(PORT, async () => {
  await connectToMongo();
  console.log(`👋 Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api/test`);
});

// Create Socket.IO server and attach it to the server
const io = initSocketIo(expressServer);

// Handle process termination:
function shutDown() {
  expressServer.close(() => {
    process.exit(0);
  });

  // Close all Socket.IO connections
  io.close();
}

// Create termination handlers
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
