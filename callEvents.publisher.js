// src/services/serviceBus/callEvents.publisher.js
import ServiceBusManager from "../../utils/serviceBusManager.js";
import { config } from "../../config/index.js";

export async function publishCallEvent({
  eventType,
  callId,
  payload = {},
  logger
}) {
  try {
    await ServiceBusManager.send(
      config.topics.CALL_EVENTS,
      {
        eventType,
        callId,
        timestamp: new Date().toISOString(),
        ...payload
      },
      {
        messageId: `${callId}-${eventType}`,
        applicationProperties: {
          callId,
          eventType
        }
      },
      logger
    );

    logger.info({ eventType }, "Call event published");
  } catch (err) {
    logger.error(
      { err: err.message, eventType },
      "Failed to publish call event"
    );
  }
}
