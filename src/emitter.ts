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
  if (!process.env.INGESTION_URL) {
    logger.error('No ingestion URL configured');
    return;
  }

  await fetch(process.env.INGESTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).catch((err) => {
    logger.error('Failed to emit event', err);
  });
}
