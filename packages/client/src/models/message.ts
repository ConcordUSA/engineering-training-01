export type MessageType = "info" | "warning" | "error" | "debug";

export interface Message {
  text: string;
  type?: MessageType;
}
