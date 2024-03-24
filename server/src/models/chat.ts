import mongoose, { Schema } from 'mongoose';

import { setupJSONTransform } from '@/lib/transform';
import type { IChatDocument } from '@/types/chat';

const chatSchema = new Schema<IChatDocument>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

setupJSONTransform(chatSchema);

const Chat = mongoose.model<IChatDocument>('Chat', chatSchema);

export { Chat };
