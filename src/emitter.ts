import logger from './logger';

export type ThreadCreatePayload = {
  forumCategory: string;
  title: string;
  timestamp: Date;
  threadId: string;
  messageId: string;
  messageContent: string;
  authorId: string;
};

type ThreadReplyPayload = {
  threadId: string;
  timestamp: Date;
  authorId: string;
  messageId: string;
  messageContent: string;
};

export type EventType =
  | {
      type: 'thread_create';
      payload: ThreadCreatePayload;
    }
  | {
      type: 'thread_reply';
      payload: ThreadReplyPayload;
    };

export async function emit(event: EventType) {
  logger.debug(JSON.stringify(event, null, 2));
}
