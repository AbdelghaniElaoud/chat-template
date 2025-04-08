/**
 * Represents a conversation entity with its associated properties.
 *
 * @interface Conversation
 *
 * @property {number} id - The unique identifier of the conversation.
 * @property {string} name - The name or title of the conversation.
 * @property {string} createdOn - The date and time when the conversation was created, formatted as a string.
 */
export interface Conversation {
  code: number;
  name: string;
  createdOn: string;
}
