import logger from "./logger";

export enum ParseTokenType {
  Mention = "mention",
  Newline = "newline",
  Italics = "italics",
  Bold = "bold",
  Strikethrough = "strikethrough",
  Code = "code",
  CodeBlock = "code_block",
  Quote = "quote",
  QuoteBlock = "quote_block",
  Link = "link",
  Image = "image",
  Spoiler = "spoiler",
}

export type ParseToken = string | { type: ParseTokenType; value: string };

export type ThreadCreatePayload = {
  forumCategory: string;
  title: string;
  timestamp: Date;
  threadId: string;
  messageId: string;
  messageContent: Array<ParseToken>;
  authorId: string;
};

type ThreadReplyPayload = {
  threadId: string;
  timestamp: Date;
  authorId: string;
  messageId: string;
  messageContent: Array<ParseToken>;
};

export type EventType =
  | {
      type: "thread_create";
      payload: ThreadCreatePayload;
    }
  | {
      type: "thread_reply";
      payload: ThreadReplyPayload;
    };

export async function emit(event: EventType) {
  logger.debug(JSON.stringify(event, null, 2));
}
