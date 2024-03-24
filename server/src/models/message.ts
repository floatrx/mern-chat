import mongoose, { Schema } from 'mongoose';

import type { IMessageDocument } from '@/types/message';

const messageSchema = new Schema<IMessageDocument>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const Message = mongoose.model<IMessageDocument>('Message', messageSchema);

export { Message };
