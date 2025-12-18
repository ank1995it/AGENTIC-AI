// src/services/serviceBus/transcripts.publisher.js
import ServiceBusManager from "../../utils/serviceBusManager.js";
import { config } from "../../config/index.js";

export async function publishTranscript({
  eventType,
  callId,
  turnId,
  text,
  extra = {},
  logger
}) {
  try {
    await ServiceBusManager.send(
      config.topics.CALL_TRANSCRIPTS,
      {
        eventType,
        callId,
        turnId,
        sequence: turnId,
        text,
        timestamp: new Date().toISOString(),
        ...extra
      },
      {
        messageId: `${callId}-${eventType}-${turnId}`,
        applicationProperties: {
          callId,
          eventType,
          turnId
        }
      },
      logger
    );

    logger.info({ eventType, turnId }, "Transcript event published");
  } catch (err) {
    logger.error(
      { err: err.message, eventType },
      "Failed to publish transcript event"
    );
  }
}
