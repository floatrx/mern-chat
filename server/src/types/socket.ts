import { Server } from 'socket.io';

export type TServerInstance = ConstructorParameters<typeof Server>[0];
