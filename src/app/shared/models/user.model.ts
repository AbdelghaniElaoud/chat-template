/**
 * Represents a User within the system.
 *
 * @interface User
 * @property {number} id - A unique identifier for the user.
 * @property {string} username - The username associated with the user.
 */
export interface User {
  code: number;
  username: string;
  accessToken:string;
  refreshToken:string;
}
