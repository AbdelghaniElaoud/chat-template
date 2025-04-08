import {MessageTypeEnum} from '../enums/message-type.enum';

/**
 * Represents a message in a conversation.
 *
 * This interface defines the structure of a message object that is part of a conversation.
 * It includes details about the message sender, content, and optional metadata such as ID and timestamp.
 *
 * Properties:
 * - `id` (optional): A unique identifier for the message.
 * - `conversationId`: The identifier of the conversation to which the message belongs.
 * - `sender`: The name or identifier of the sender of the message.
 * - `content`: The actual text content of the message.
 * - `timestamp` (optional): The date and time the message was sent or recorded.
 */
export interface Message {
  code?: number;
  conversationId: number;
  sender: string | undefined;
  senderId: number | undefined;
  content: string;
  type: MessageTypeEnum;
  sentOn?: Date;
  read: boolean;
}
