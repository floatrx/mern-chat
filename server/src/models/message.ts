import mongoose, { Schema } from 'mongoose';

import type { IMessage } from '@/types/message';

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const Message = mongoose.model<IMessage>('Message', messageSchema);

export { Message };