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
